import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Divider,
  Autocomplete,
  Snackbar,
  Alert,
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoBase64 from "../components/Demo";
import "../style.css";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#F2F2FF" },
  },
  typography: { fontFamily: "'Segoe UI', sans-serif" },
});

export default function DOFORM() {
  const [form, setForm] = useState({
    doDate: "",
    blNo: "",
    blDate: "",
    masterBlNo: "",
    consignee: "",
    cargoDesc: "",
    delivery: "FULL",
    packages: "",
    packageType: "",
    measurement: "",
    grossWt: "",
    vessel: "",
    rotationIgm: "",
    localIgm: "",
    smtpNo: "",
    subLineNo: "",
    destuffing: "",
    validTill: "",
    address: "INLAND CONTAINER DEPOT (ICD)\nWHITE FIELD BANGALORE",
    containers: [{ number: "", type: "" }],
  });

  const MotionButton = motion(Button);
  const [openToast, setOpenToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [containerCountInput, setContainerCountInput] = useState("1"); // string for raw input

  // When "No. of Container" is changed
  const handleContainerCountChange = (e) => {
    const value = e.target.value;
    setContainerCountInput(value); // let the user type freely

    const count = parseInt(value, 10);

    if (!isNaN(count) && count > 0) {
      setForm((prev) => {
        let newContainers = [...prev.containers];
        if (count > newContainers.length) {
          while (newContainers.length < count) {
            newContainers.push({ number: "", type: "" });
          }
        } else if (count < newContainers.length) {
          newContainers = newContainers.slice(0, count);
        }
        return { ...prev, containers: newContainers };
      });
    }
  };


  // When individual container No/Type changes
  const handleContainerChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.containers];
      updated[index][field] = value.toUpperCase();
      return { ...prev, containers: updated };
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const isDate = name === "doDate" || name === "blDate" || name === "validTill";
    setForm((prev) => ({ ...prev, [name]: isDate ? value : value.toUpperCase() }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const dd = ("0" + d.getDate()).slice(-2);
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const getImageFormat = (dataUrlOrBase64) => {
    if (typeof dataUrlOrBase64 !== "string") return "PNG";
    if (dataUrlOrBase64.startsWith("data:image/png")) return "PNG";
    if (dataUrlOrBase64.startsWith("data:image/jpeg") || dataUrlOrBase64.startsWith("data:image/jpg")) return "JPEG";
    return "PNG";
  };

  const generatePDF = () => {
    const required = [
      "doDate",
      "blNo",
      "masterBlNo",
      "consignee",
      "cargoDesc",
      "delivery",
      "packages",
      "grossWt",
      "measurement",
      "validTill",
    ];

    const missing = required.filter((k) => !form[k]);
    const missingContainers = form.containers.some(c => !c.number || !c.type);

    if (missing.length || missingContainers) {
      alert("Please fill all required fields before downloading the PDF.");
      return;
    }

    setIsDownloading(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      // ---- Header ----
      const imgFmt = getImageFormat(logoBase64);
      try {
        doc.addImage(logoBase64, imgFmt, 10, 10, 25, 25);
      } catch {

      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("SREE EXIM SOLUTIONS", 40, 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const addressLines = [
        "UNIT NO. T-2310 | BLOCK B 3RD FLOOR | ARDENTE OFFICE ONE",
        "HOODI MAIN RD | BENGALURU 560048.",
        "Phone: 080-4111 4344 | Email: sesblr@sreegroup.net | Website: https://www.sreegroup.net",
      ];

      let startY = 23;
      addressLines.forEach(line => {
        doc.text(line, 40, startY, { maxWidth: 160 });
        startY += 5; // line spacing
      });


      doc.setLineWidth(0.3);
      doc.line(10, 38, 200, 38);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("DELIVERY ORDER", 105, 45, { align: "center" });

      // ---- Address & intro ----
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("To,", 10, 55);
      doc.text("THE MANAGER", 10, 60);
      const addrLines = String(form.address).split("\n");
      addrLines.forEach((ln, i) => doc.text(ln, 10, 65 + i * 5));
      doc.text(`Date: ${formatDate(form.doDate)}`, 200, 55, { align: "right" });

      const bodyStartY = 65 + addrLines.length * 5 + 10; // after address
      doc.text(
        "You are requested to kindly make delivery of the below mentioned container(s), whose details are as follows:",
        10,
        bodyStartY,
        { maxWidth: 190 }
      );

      // ---- Details table (autoTable) ----
      const rows = [
        ["BL NO", ":", `${form.blNo} Date: ${formatDate(form.blDate)}`],
        ["MASTER BL NO", ":", form.masterBlNo],
        [
          "Container No(s)",
          ":",
          form.containers.map(c => `${c.number} (${c.type}ft)`).join("\n") // ⬅️ stack vertically
        ],
        ["Consignee", ":", form.consignee],
        ["Cargo Description", ":", form.cargoDesc],
        ["Delivery", ":", form.delivery],
        ["No. of Packages", ":", `${form.packages} ${form.packageType}`],
        ["Measurement", ":", `${form.measurement} CBM`],
        ["Gross Wt.", ":", `${form.grossWt} KGS`],
        ["Vessel / Voyage", ":", form.vessel],
        ["Rotation IGM No", ":", form.rotationIgm],
        ["Local IGM No.", ":", form.localIgm],
        ["SMTP No.", ":", form.smtpNo],
        ["Sub-Line No.", ":", form.subLineNo],
        ["De-stuffing Station", ":", form.destuffing],
      ];

      autoTable(doc, {
        startY: bodyStartY + 7,
        theme: "plain", // removes default borders/background
        styles: {
          font: "helvetica",
          fontSize: 12,
          cellPadding: 2, // uniform padding for even vertical centering
          lineWidth: 0,
          valign: "middle", // vertical center
        },
        bodyStyles: {
          textColor: 0,
          minCellHeight: 8, // ensures all rows have enough height to center text
          valign: "middle", // vertical center
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 45, halign: "left", valign: "top" },
          1: { cellWidth: 5, halign: "center", valign: "top" },
          2: { cellWidth: 120, halign: "left", valign: "middle" },
        },
        body: rows,
        didParseCell: (data) => {
          if (data.section === "body" && data.column.index === 0) {
            data.cell.styles.fontStyle = "bold";
          }
        },
      });

      let y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : bodyStartY + 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Marks & Nos.", 10, y);
      y += 6;

      doc.text("This delivery order is valid till: ", 10, y);
      const validTillX = doc.getTextWidth("This delivery order is valid till: ") + 10;
      doc.setFont("helvetica", "bold");
      doc.text(formatDate(form.validTill), validTillX, y);

      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        "NOTE: NO MANUAL REVALIDATION OF DATE IS ALLOWED ON THIS DELIVERY ORDER, ONLY FRESH DELIVERY ORDER TO BE ACCEPTED.",
        10,
        y,
        { maxWidth: 190 }
      );
      y += 15;
      doc.text(
        "(THIS IS A COMPUTER-GENERATED DOCUMENT AND DOES NOT REQUIRE A SEAL & SIGNATURE.)",
        105,
        y,
        { align: "center" }
      );

      doc.save("SES_Delivery_Order.pdf");
      setOpenToast(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Please check console for details.");
    } finally {
      setIsDownloading(false);
    }
  };

  const addressOptions = [
    "INLAND CONTAINER DEPOT (ICD)\nWHITE FIELD BANGALORE",
    "PEARL CONTAINER TERMINALS,\nNO.53, SIPCOT INDUSTRIAL COMPLEX,\nPHASE-I, HOSUR – 635126",
    "ENNORE CARGO CONTAINER TERMINAL PVT LTD,\nCHENNAI",
  ];

  const containerTypes = ["20", "40", "20HC", "40HC","20GP", "40GP"];
  const packageTypes = [
    "BDL", "BGS", "BLK", "BLS", "BOX", "BRL", "BUL", "CAN", "CAS", "CHT", "CLS", "COL", "CRT", "CSK", "CTN", "CYL", "DRM", "EVN", "FLK", "FUT", "HBK", "JBL", "JTA", "KEG", "LFT", "LOG", "NGT", "PAL", "PCS", "PKG", "PLT", "QDS", "REL", "RLS", "SHT", "SKD", "SLB", "TSL", "TIN", "TRK", "UNT"
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <Container sx={{ mt: 4, mb: 6 }}>
          {/* ---- Form ---- */}
          <Paper sx={{ p: 3, mb: 4, borderRadius: 5, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
            <Typography sx={{ fontWeight: "bold", color: '#091322', textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }} variant="h4" align="start" mb={8}>
              Delivery Order
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  select
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  sx={{ maxWidth: 250, fontSize: "10" }}
                >
                  {addressOptions.map((opt, i) => (
                    <MenuItem key={i} value={opt}>
                      {opt.split("\n")[0]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} type="date" label="DO Date" name="doDate" value={form.doDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="HBL No" name="blNo" value={form.blNo} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} type="date" label="BL Date" name="blDate" value={form.blDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Master BL No" name="masterBlNo" value={form.masterBlNo} onChange={handleChange} fullWidth required />
              </Grid>

              {/* No. of Containers */}
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ minWidth: 250 }}
                  type="number"
                  label="No. of Container"
                  value={containerCountInput}
                  onChange={handleContainerCountChange}
                  fullWidth
                  required
                  inputProps={{ min: 1 }}
                />

              </Grid>

              {/* Dynamic Container Inputs */}
              {form.containers.map((container, idx) => (
                <React.Fragment key={idx}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      sx={{ minWidth: 250 }}
                      label={`Container No ${idx + 1}`}
                      value={container.number}
                      onChange={(e) => handleContainerChange(idx, "number", e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      freeSolo
                      options={containerTypes}
                      inputValue={container.type}
                      onInputChange={(_, newValue) => handleContainerChange(idx, "type", newValue || "")}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ minWidth: 250 }} label={`Container Type ${idx + 1}`} fullWidth required />
                      )}
                    />
                  </Grid>
                </React.Fragment>
              ))}


              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Consignee" name="consignee" value={form.consignee} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Cargo Description" name="cargoDesc" value={form.cargoDesc} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="No. of Packages" name="packages" value={form.packages} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  options={packageTypes}
                  inputValue={form.packageType}
                  onInputChange={(_, newValue) => setForm((p) => ({ ...p, packageType: (newValue || "").toUpperCase() }))}
                  renderInput={(params) => <TextField sx={{ minWidth: 250 }} {...params} label="Package Type" fullWidth required />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Delivery" name="delivery" value={form.delivery} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Measurement (CBM)" name="measurement" value={form.measurement} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Gross Weight (KGS)" name="grossWt" value={form.grossWt} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Vessel / Voyage" name="vessel" value={form.vessel} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Rotation IGM No" name="rotationIgm" value={form.rotationIgm} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Local IGM No" name="localIgm" value={form.localIgm} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="SMTP No" name="smtpNo" value={form.smtpNo} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="Sub-Line No" name="subLineNo" value={form.subLineNo} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} label="De-stuffing Station" name="destuffing" value={form.destuffing} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField sx={{ minWidth: 250 }} type="date" label="Valid Till" name="validTill" value={form.validTill} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
              </Grid>
            </Grid>
          </Paper>

          {/* ---- Preview (no HTML table) ---- */}
          <Paper sx={{ p: 4, borderRadius: 5, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
            <Box display="flex" mb={2} alignItems="center">
              <img
                src={logoBase64}
                alt="Logo"
                style={{ width: 80, height: "auto", marginRight: 12 }}
                crossOrigin="anonymous"
              />
              <Box>
                <Typography variant="h5"><strong>SREE EXIM SOLUTIONS</strong></Typography>
                <Typography variant="body2">
                  ADD: UNIT NO. T-2310 | BLOCK B 3RD FLOOR | ARDENTE OFFICE ONE HOODI MAIN RD | BENGALURU 560048.
                  <br />
                  Phone: 080-4111 4344 | Email: sesblr@sreegroup.net | Website: https://www.sreegroup.net
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ "&::before, &::after": { borderColor: "black" }, my: 2 }} />

            <Typography variant="h6" align="center"><strong>DELIVERY ORDER</strong></Typography>

            <Box mb={1}>
              <Typography sx={{ whiteSpace: "pre-line", textTransform: "uppercase" }}>
                To,
                {"\n"}THE MANAGER
                {"\n"}{form.address}
              </Typography>
              <Typography textAlign="end"><strong>Date: {formatDate(form.doDate)}</strong></Typography>
            </Box>

            <Typography paragraph>Dear Sir,</Typography>
            <Typography paragraph>
              You are requested to kindly make delivery of the below mentioned container(s), whose details are as follows:
            </Typography>

            {/* Key/Value list (no tables) */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "220px 10px 1fr", // label | colon | value
                rowGap: 0.5,
                alignItems: "center", // vertical center
              }}
            >
              {[
                ["BL NO", `${form.blNo}  Date: ${formatDate(form.blDate)}`],
                ["MASTER BL NO", form.masterBlNo],
                ["Container No(s)", form.containers.map(c => `${c.number} (${c.type}ft)`).join(", ")],
                ["Consignee", form.consignee],
                ["Cargo Description", form.cargoDesc],
                ["Delivery", form.delivery],
                ["No. of Packages", `${form.packages} ${form.packageType}`],
                ["Measurement", `${form.measurement} CBM`],
                ["Gross Wt.", `${form.grossWt} KGS`],
                ["Vessel / Voyage", form.vessel],
                ["Rotation IGM No", form.rotationIgm],
                ["Local IGM No.", form.localIgm],
                ["SMTP No.", form.smtpNo],
                ["Sub-Line No.", form.subLineNo],
                ["De-stuffing Station", form.destuffing],
              ].map(([label, value], i) => (
                <React.Fragment key={i}>
                  <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
                  <Typography sx={{ textAlign: "center" }}>:</Typography>
                  <Typography>{value}</Typography>
                </React.Fragment>
              ))}
            </Box>

            <Typography sx={{ mt: 2 }}>Marks & Nos.</Typography>
            <Typography>
              This delivery order is valid till: <strong>{formatDate(form.validTill)}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={2}>
              NOTE: NO MANUAL REVALIDATION OF DATE IS ALLOWED ON THIS DELIVERY ORDER, ONLY FRESH DELIVERY ORDER TO BE ACCEPTED.
            </Typography>
            <Typography variant="body2" align="center" mt={2}>
              (THIS IS A COMPUTER-GENERATED DOCUMENT AND DOES NOT REQUIRE A SEAL & SIGNATURE.)
            </Typography>
          </Paper>

          <MotionButton
            variant="contained"
            color="primary"
            onClick={generatePDF}
            disabled={isDownloading}
            sx={{
              mt: 3,
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <CircularProgress size={20} color="inherit" />
                </motion.div>
              ) : (
                <motion.span
                  key="icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  📄
                </motion.span>
              )}
            </AnimatePresence>
            <Typography variant="button">
              {isDownloading ? "Generating..." : "Download PDF"}
            </Typography>
          </MotionButton>

          <AnimatePresence>
            {openToast && (
              <Snackbar
                open={openToast}
                autoHideDuration={1500}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setOpenToast(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                  variant="filled"
                  icon={
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      ✅
                    </motion.div>
                  }
                >
                  PDF downloaded successfully!
                </Alert>
              </Snackbar>
            )}
          </AnimatePresence>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}

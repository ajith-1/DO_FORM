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

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" },
  },
  typography: { fontFamily: "'Segoe UI', sans-serif" },
});

export default function CONCOR() {
  const [form, setForm] = useState({
    importerName: "",
    importerGST: "",
    chaName: "SREE EXIM SOLUTIONS",
    boeNo: "",
    boeDate: "",
    shippingLine: "",
    containerNo: "",
    importAppDate: "",
    cargoType: "",
    weight: "",
    packages: "",
    lclFcl: "",
    deliveryType: "",
    vehicle: "",
    equipment: "",
    paymentMode: "",
  });

  const [openToast, setOpenToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${("0" + d.getDate()).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()}`;
  };

  const generatePDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("CONCOR IMPORT APPLICATION FORM", 105, 15, { align: "center" });
      doc.line(10, 20, 200, 20);

      const rows = [
        ["Importer Name", form.importerName],
        ["Importer GST No.", form.importerGST],
        ["CHA Name", form.chaName],
        ["Bill of Entry No.", form.boeNo],
        ["Bill of Entry Date", formatDate(form.boeDate)],
        ["Shipping Line", form.shippingLine],
        ["Container No.", form.containerNo],
        ["Import App. Date", formatDate(form.importAppDate)],
        ["Cargo Type", form.cargoType],
        ["Weight", `${form.weight} KGS`],
        ["No. of Packages", `${form.packages} PKG`],
        ["LCL / FCL", form.lclFcl],
        ["Delivery Type", form.deliveryType],
        ["Vehicle", form.vehicle],
        ["Equipment Required", form.equipment],
        ["Payment Mode", form.paymentMode],
      ];

      autoTable(doc, {
        startY: 25,
        theme: "grid",
        styles: { fontSize: 11, cellPadding: 3, valign: "middle" },
        headStyles: { fillColor: [25, 118, 210] },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 70 },
          1: { cellWidth: 110 },
        },
        body: rows,
      });

      let y = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(10);
      doc.text(
        "(This is a computer-generated document and does not require a signature.)",
        105,
        y,
        { align: "center" }
      );

      doc.save("Concor_Import_Application.pdf");
      setOpenToast(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Check console.");
    } finally {
      setIsDownloading(false);
    }
  };

  const cargoOptions = ["Hazardous", "Non-Hazardous"];
  const lclFclOptions = ["LCL", "FCL"];
  const deliveryOptions = ["WH", "Direct", "Outside"];
  const vehicleOptions = ["Lorry", "Tempo", "Trailer"];
  const equipmentOptions = ["Fork", "Crane", "Manual", "Kalmar"];
  const paymentOptions = ["Cash", "DD", "PDA A/c"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {/* --- Form --- */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
              CONCOR IMPORT APPLICATION FORM
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="Importer Name" name="importerName" value={form.importerName} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="Importer GST No." name="importerGST" value={form.importerGST} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField sx={{ minWidth: 250 }} label="CHA Name" name="chaName" value={form.chaName} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="Bill of Entry No." name="boeNo" value={form.boeNo} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} type="date" label="Bill of Entry Date" name="boeDate" value={form.boeDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required /></Grid>
              <Grid item xs={12}><TextField sx={{ minWidth: 250 }} label="Shipping Line" name="shippingLine" value={form.shippingLine} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="Container No." name="containerNo" value={form.containerNo} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={6} sm={3}><TextField sx={{ minWidth: 250 }} type="date" label="Import App. Date" name="importAppDate" value={form.importAppDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} select label="Cargo Type" name="cargoType" value={form.cargoType} onChange={handleChange} fullWidth required>{cargoOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="Weight" name="weight" value={form.weight} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} label="No. of Packages" name="packages" value={form.packages} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} select label="LCL / FCL" name="lclFcl" value={form.lclFcl} onChange={handleChange} fullWidth required>{lclFclOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} select label="Delivery Type" name="deliveryType" value={form.deliveryType} onChange={handleChange} fullWidth required>{deliveryOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} select label="Vehicle" name="vehicle" value={form.vehicle} onChange={handleChange} fullWidth required>{vehicleOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12} sm={6}><TextField sx={{ minWidth: 250 }} select label="Equipment Required" name="equipment" value={form.equipment} onChange={handleChange} fullWidth required>{equipmentOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
              <Grid item xs={12}><TextField sx={{ minWidth: 250 }} select label="Payment Mode" name="paymentMode" value={form.paymentMode} onChange={handleChange} fullWidth required>{paymentOptions.map((o,i)=><MenuItem key={i} value={o}>{o}</MenuItem>)}</TextField></Grid>
            </Grid>
          </Paper>

          {/* --- Preview --- */}
          <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Typography variant="h6" align="center" gutterBottom><strong>Preview</strong></Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "200px 10px 1fr", rowGap: 1 }}>
              {[
                ["Importer Name", form.importerName],
                ["Importer GST No.", form.importerGST],
                ["CHA Name", form.chaName],
                ["Bill of Entry No.", form.boeNo],
                ["Bill of Entry Date", formatDate(form.boeDate)],
                ["Shipping Line", form.shippingLine],
                ["Container No.", form.containerNo],
                ["Import App. Date", formatDate(form.importAppDate)],
                ["Import App. Time", form.importAppTime],
                ["Cargo Type", form.cargoType],
                ["Weight", form.weight],
                ["No. of Packages", form.packages],
                ["LCL / FCL", form.lclFcl],
                ["Delivery Type", form.deliveryType],
                ["Vehicle", form.vehicle],
                ["Equipment Required", form.equipment],
                ["Payment Mode", form.paymentMode],
              ].map(([label, value], i) => (
                <React.Fragment key={i}>
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                  <Typography>:</Typography>
                  <Typography>{value}</Typography>
                </React.Fragment>
              ))}
            </Box>
          </Paper>

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={generatePDF}
              sx={{ mt: 2, px: 4, py: 1.5, fontWeight: "bold", borderRadius: "12px" }}
              disabled={isDownloading}
              startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : "📄"}
            >
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>
          </Box>

          <AnimatePresence>
            {openToast && (
              <Snackbar
                open={openToast}
                autoHideDuration={2000}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setOpenToast(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                  variant="filled"
                >
                  ✅ PDF downloaded successfully!
                </Alert>
              </Snackbar>
            )}
          </AnimatePresence>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}


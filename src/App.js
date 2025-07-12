import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import html2pdf from "html2pdf.js";

export default function App() {
  const [form, setForm] = useState({
    doDate: "2025-07-10",
    blNo: "O250612EVE039",
    blDate: "2025-06-19",
    masterBlNo: "GGZ2571533",
    containerNo: "CAIU6293870",
    containerType: "1x20GP",
    consignee: "SNOOKER ALLEY",
    cargoDesc: "SNOOKER TABLE COMPLETE",
    delivery: "FULL",
    packages: "272 PKG",
    measurement: "-",
    grossWt: "15753 KGS",
    vessel: "-",
    rotationIgm: "Date: -",
    localIgm: "Date: -",
    smtpNo: "-",
    subLineNo: "-",
    destuffing: "Date: -",
    validTill: "2025-07-17"
  });

  const previewRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return (
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear()
    );
  };

  const generatePDF = () => {
    const element = previewRef.current;
    const opt = {
      margin: 0.5,
      filename: "SES Delivery_Order.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Delivery Order 
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="doDate"
              value={form.doDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="BL No"
              name="blNo"
              value={form.blNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="BL Date"
              type="date"
              name="blDate"
              value={form.blDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Master BL No"
              name="masterBlNo"
              value={form.masterBlNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Container No and Container Type side by side */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Container No(s)"
              name="containerNo"
              value={form.containerNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Container Type"
              name="containerType"
              value={form.containerType}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Consignee"
              name="consignee"
              value={form.consignee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cargo Description"
              name="cargoDesc"
              value={form.cargoDesc}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Delivery"
              name="delivery"
              value={form.delivery}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="No. of Packages"
              name="packages"
              value={form.packages}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Measurement"
              name="measurement"
              value={form.measurement}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gross Weight"
              name="grossWt"
              value={form.grossWt}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vessel / Voyage"
              name="vessel"
              value={form.vessel}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rotation IGM No"
              name="rotationIgm"
              value={form.rotationIgm}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Local IGM No"
              name="localIgm"
              value={form.localIgm}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="SMTP No"
              name="smtpNo"
              value={form.smtpNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sub-Line No"
              name="subLineNo"
              value={form.subLineNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="De-stuffing Station"
              name="destuffing"
              value={form.destuffing}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Valid Till"
              type="date"
              name="validTill"
              value={form.validTill}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }} ref={previewRef}>
        <Box textAlign="center" mb={2}>
          <img
            src="https://via.placeholder.com/150x50.png?text=LOGO"
            alt="Logo"
            style={{ width: "150px", marginBottom: "10px" }}
          />
          <Typography variant="h6">SREE EXIM SOLUTIONS</Typography>
          <Typography variant="body2">
            ADD: NO. S1 SV YASHAS, 4TH FLOOR (LIFT 5TH), D SILVA LAYOUT,
            WHITEFIELD, BANGALORE 560066 INDIA.
            <br />
            Phone: 080-41739105 | Email: sesblr@sreegroup.net | Website:
            https://www.sreegroup.net
          </Typography>
        </Box>

        <Typography variant="h5" color="error" gutterBottom>
          DELIVERY ORDER
        </Typography>

        <Typography>
          To,<br />
          The Manager<br />
          INLAND CONTAINER DEPOT (ICD)<br />
          WHITE FIELD BANGALORE<br />
          <strong>Date: {formatDate(form.doDate)}</strong>
        </Typography>

        <Typography paragraph mt={2}>Dear Sir,</Typography>
        <Typography paragraph>
          You are requested to kindly make delivery of the below mentioned
          container(s), whose details are as follows:
        </Typography>

        <table style={{ width: "100%", marginBottom: "10px" }}>
          <tbody>
            <tr>
              <td>BL NO :</td>
              <td>{form.blNo} Date: {formatDate(form.blDate)}</td>
            </tr>
            <tr><td>MASTER BL NO :</td><td>{form.masterBlNo}</td></tr>
            <tr>
              <td>Container No(s) :</td>
              <td>{form.containerNo} {form.containerType}</td>
            </tr>
            <tr><td>Consignee :</td><td>{form.consignee}</td></tr>
            <tr><td>Cargo Description :</td><td>{form.cargoDesc}</td></tr>
            <tr><td>Delivery :</td><td>{form.delivery}</td></tr>
            <tr><td>No. of Packages :</td><td>{form.packages}</td></tr>
            <tr><td>Measurement :</td><td>{form.measurement}</td></tr>
            <tr><td>Gross Wt. :</td><td>{form.grossWt}</td></tr>
            <tr><td>Vessel / Voyage :</td><td>{form.vessel}</td></tr>
            <tr><td>Rotation IGM No :</td><td>{form.rotationIgm}</td></tr>
            <tr><td>Local IGM No. :</td><td>{form.localIgm}</td></tr>
            <tr><td>SMTP No. :</td><td>{form.smtpNo}</td></tr>
            <tr><td>Sub-Line No. :</td><td>{form.subLineNo}</td></tr>
            <tr><td>De-stuffing Station :</td><td>{form.destuffing}</td></tr>
          </tbody>
        </table>

        <Typography>Marks & Nos.</Typography>
        <Typography>
          This delivery order is valid till: {formatDate(form.validTill)}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={2}>
          NOIE: NO MANUAL REVALIDATION OF DATE IS ALLOWED ON THIS DELIVERY
          ORDER, ONLY FRESH DELIVERY ORDER TO BE ACCEPTED.
        </Typography>

        <Typography variant="body2" align="center" mt={2}>
          (THIS IS A COMPUTER-GENERATED DOCUMENT AND DOES NOT REQUIRE A SEAL &
          SIGNATURE.)
        </Typography>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        sx={{ mt: 3 }}
      >
        Download PDF
      </Button>
    </Container>
  );
}

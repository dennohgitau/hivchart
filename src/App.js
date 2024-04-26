import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


      // Extract headers
      const sheetHeaders = jsonData[0];

      setHeaders(sheetHeaders);

      // Convert JSON data to array of objects (excluding headers)
      const parsedData = jsonData.slice(1).map(row =>
        sheetHeaders.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {})
      );
      setData(parsedData);
      setDataLoaded(true);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (dataLoaded && data.length > 0 && headers.length > 0) {
      renderChart(data, headers);
    }
  }, [dataLoaded, data, headers]);

  const renderChart = (data, headers) => {
    const years = data.map(row => row[headers[0]]);
    const values = data.map(row => row[headers[3]]);
    
    

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: headers[1],
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: headers[0]
            }
          },
          y: {
            title: {
              display: true,
              text: headers[1]
            }
          }
        }
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1,  }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HIV VISUALCHART
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box component="section" sx={{ p: 5, border: '1px dashed grey', margin: 10 }}>
        <div>
          <h1>Upload Excel File</h1>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          
        </div>
      </Box>
      <Container fixed>
        {dataLoaded && <canvas id="lineChart" style={{ width: '100%', height: '400px' }}></canvas>}
      </Container>
    </Box>
  );
}

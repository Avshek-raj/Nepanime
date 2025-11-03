import express from 'express';
import cors from 'cors';
import https from 'https';
import { URL } from 'url';
import rateLimit from 'express-rate-limit';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// CORS configuration with specific origins
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Parse JSON bodies with size limit
app.use(express.json({ limit: '1mb' }));

// Improved URL validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Add timeout to requests
const makeRequest = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const timeout = 10000; // 10 seconds
    const req = https.request(url, {
      ...options,
      timeout: timeout
    }, resolve);
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
};

// Master playlist endpoint with improved error handling
app.get('/proxy/master', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const proxyResponse = await makeRequest(url);
    let data = '';
    
    proxyResponse.on('data', chunk => data += chunk);
    proxyResponse.on('end', () => {
      // Process playlist...
      // ... existing playlist processing code ...
    });
  } catch (error) {
    console.error('Master proxy error:', error);
    res.status(error.statusCode || 500).json({
      error: 'Proxy error',
      message: error.message
    });
  }
});

// Segment endpoint with improved caching
app.get('/proxy/segment', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const proxyResponse = await makeRequest(url);
    
    // Set caching headers
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Set appropriate content type
    const contentType = proxyResponse.headers['content-type'];
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    proxyResponse.pipe(res);
  } catch (error) {
    console.error('Segment proxy error:', error);
    res.status(error.statusCode || 500).json({
      error: 'Proxy error',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

const PORT = process.env.PROXY_PORT || 3001;

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`CORS proxy server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
import { NextResponse, type NextRequest } from 'next/server';
import { analyzeSite, analyzeLink } from '@/lib/analysis';

export const config = {
  runtime: 'edge',
};

const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_REQUESTS_PER_WINDOW = 10;
const ipRequestCounts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let requests = ipRequestCounts.get(ip) || [];
  
  requests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (requests.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestCounts.set(ip, requests);
    return true;
  }

  requests.push(now);
  ipRequestCounts.set(ip, requests);
  
  // Clean up old entries
  setTimeout(() => {
      const currentRequests = ipRequestCounts.get(ip) || [];
      const filteredRequests = currentRequests.filter(timestamp => Date.now() - timestamp < RATE_LIMIT_WINDOW);
      if (filteredRequests.length > 0) {
          ipRequestCounts.set(ip, filteredRequests);
      } else {
          ipRequestCounts.delete(ip);
      }
  }, RATE_LIMIT_WINDOW + 1000);


  return false;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
  }

  const { searchParams } = new URL(request.url);
  const urlToScan = searchParams.get('url');

  if (!urlToScan) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400, headers: corsHeaders });
  }

  let formattedUrl = urlToScan.trim();
  if (!/^(https?:\/\/)/i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  try {
    new URL(formattedUrl);
  } catch (_) {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400, headers: corsHeaders });
  }

  try {
    const siteAnalysisResult = await analyzeSite(formattedUrl);
    const linkAnalysisResult = analyzeLink(formattedUrl, siteAnalysisResult);

    const combinedResult = {
      url: formattedUrl,
      riskAnalysis: linkAnalysisResult,
      siteAnalysis: siteAnalysisResult,
    };

    return NextResponse.json(combinedResult, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('API Analysis Error:', error);
    return NextResponse.json({ error: 'An internal error occurred during analysis.' }, { status: 500, headers: corsHeaders });
  }
}

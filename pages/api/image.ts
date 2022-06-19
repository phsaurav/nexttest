import chromium from 'chrome-aws-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';

// const generateQueryString = (query: {[key:string]: string | string[] | number | undefined | null})=> encodeURI(Object.keys(query).reduce((acc,cur,index) => query[cur] ? `${acc}${index === 0 ? '': '&'}${cur}=${query[cur]}` : acc, '?'));

// const generateOGImage = async({title='Nex Test'} : {title: string }) =>{
// 	const browser = await chromium.puppeteer.launch({
// 		fs: false,
// 		args: chromium.args,
// 		executablePath: await chromium.executablePath,
// 		headless: true
// 	})

// 	const page = await browser.newPage();
// 	await page.setViewport({width: 1200, height: 630});
// 	await page.goto((`https://nexttest-og.vercel.app/og/image?${generateQueryString({title})}`), {waitUntil: 'networkidle2'})
// 	const buffer = await page.screenshot({type: 'jpeg'});
// 	await browser.close();
// 	return buffer.toString('base64');
// }

// exports.handler = async function({queryStringParameters}: any) {
// 	const {title} = queryStringParameters;
// 	const buffer = await generateOGImage({title});

// 	return {
// 		statusCode: 200,
// 		body: JSON.stringify({buffer})
// 	}
// }

import playwright from 'playwright-core';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Start the browser with the AWS Lambda wrapper (chrome-aws-lambda)
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  })
  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630
    }
  });
  // Generate the full URL out of the given path (GET parameter)
  const url = `https://nexttest-og.vercel.app/og/image?title=Itsworking`
  await page.goto(url, {
    timeout: 15 * 1000
  })
  const data = await page.screenshot({
    type: "png"
  })
  await browser.close()
  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
  res.setHeader('Content-Type', 'image/png')
  // write the image to the response with the specified Content-Type
  res.end(data)
}
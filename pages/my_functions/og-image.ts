
const chromium = require('chrome-aws-lambda')

const generateQueryString = (query: {[key:string]: string | string[] | number | undefined | null})=> encodeURI(Object.keys(query).reduce((acc,cur,index) => query[cur] ? `${acc}${index === 0 ? '': '&'}${cur}=${query[cur]}` : acc, '?'));

const generateOGImage = async({title='Nex Test'} : {title: string }) =>{
	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		executablePath: await chromium.executablePath,
		headless: true
	})

	const page = await browser.newPage();
	await page.setViewport({width: 1200, height: 630});
	await page.goto((`https://nexttest-og.vercel.app/og/image?{generateQueryString({title})}`), {waitUntil: 'networkidle2'})
	const buffer = await page.screenshot({type: 'jpeg'});
	await browser.close();
	return buffer.toString('base64');
}

exports.handler = async function({queryStringParameters}: any) {
	const {title} = queryStringParameters;
	const buffer = await generateOGImage({title});

	return {
		statusCode: 200,
		body: JSON.stringify({buffer})
	}
}

export { };


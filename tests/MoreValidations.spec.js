const {test, expect} = require("@playwright/test");


test("Popup Validations", async({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://google.com");
// await page.goBack();
// await page.goForward();

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

//Dialog or Popup
//await page.pause();
page.on('dailog', dailog => dailog.accept());
await page.locator("#confirmbtn").click();



//hover
await page.locator("#mousehover").hover();
await page.locator("a[href='#top']").click();

//iframe

const framesPage =  page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*='lifetime-access']:visible").click();
const happySubcibers = await framesPage.locator(".text h2").textContent();
console.log(happySubcibers.split(" ")[1]);

page.close();
})
// const { default: test } = require("node:test");

const { test, expect} = require('@playwright/test');


test('MakeMytrip', async ({browser}) => {

    const depatureDate = "Thu Mar 13 2025";
    const fromCity= "Mumbai, India";
    const toCity= "Chennai, India";
    const returnDate = "Sat Mar 15 2025";
    
    //launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

   //navigate to URL
    await page.goto("https://www.makemytrip.com/");

    //Locators
    const closeModal =page.locator("//span[@class='commonModal__close']");
    
    await closeModal.click();

     //FromCity
    await page.locator("//label[@for='fromCity']").click();
    await page.locator("//input[@placeholder='From']").fill(fromCity);
    await page.locator("//p[text()='"+fromCity+"']").click();


    //Tocity
    await page.locator("//label[@for='toCity']").click();
    await page.locator("//input[@placeholder='To']").fill(toCity);
    await page.locator("(//p[text()='"+toCity+"'])[1]").click();

    //departureDate
    await page.locator("//div[@class='flt_fsw_inputBox dates inactiveWidget activeWidget']").click();
    await page.locator("//div[@aria-label='"+depatureDate+"']").click();
   

      //returnDate
    await page.locator("//div[@data-cy='returnArea']").click();
    await page.waitForSelector("//div[@aria-label='"+returnDate+"']");
    await page.locator("//div[@aria-label='"+returnDate+"']").click();

    //Travellers
    await page.locator("//div[@class='flt_fsw_inputBox flightTravllers inactiveWidget ']").click();

    //Select Adult 2
    await page.locator("//li[@data-cy='adults-2']").click();

    //Apply Btn
    await page.locator("//button[@data-cy='travellerApplyBtn']").click();

    //click on search --//p[@data-cy='submit']/a
    await page.locator("//p[@data-cy='submit']/a").click();

    await page.waitForLoadState();

     //click on popup close 
    //  await page.locator("//span[@class='bgProperties overlayCrossIcon icon20']").click();

    //get price
    // const price = await page.locator("//p[@class='whiteText blackFont fontSize16']").textContent();

    await expect(page.getByText('Search')).toBeVisible();
      await expect(page.getByText('Search')).toBeDisabled();
    // console.log(price);/
    await page.close();
});

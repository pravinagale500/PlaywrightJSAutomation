const { test, expect} = require('@playwright/test');

test('Invalid Login', async ({browser}) =>
{



const context = await browser.newContext();
const page = await context.newPage();

const username = page.locator('#username')
const password = page.locator("[type='password']")
const signButton = page.locator('#signInBtn')

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
 //css
await username.fill("rahulshetty");
await password.fill("learning");
//id
await signButton.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect')


})

test('Valid Login ', async ({page})=>
    {

    const username = page.locator('#username')
    const password = page.locator("[type='password']")
    const signButton = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-body a")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

     //get title of the page
    console.log(await page.title());
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signButton.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


     page.close();
    });


    
test('UI Controls', async ({page})=>
    {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const signButton = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    
    //pause
    // await page.pause();

    //assertion
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy;

    //link verification
    await expect(documentLink).toHaveAttribute("class","blinkingText");
     
    });


    test('Child windows handle', async ({browser})=>
        {

        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        // const username = page.locator('#username');
       
        const documentLink = page.locator("[href*='documents-request']");
        
       const [newPage] = await Promise.all([

        context.waitForEvent('page'),//listen to any new page
        documentLink.click(),
        ])

        const text = await newPage.locator(".red").textContent();
        const arrayText = text.split('@')
        const domain = arrayText[1].split(" ")[0]
        console.log(domain);

        const domain2 = domain.split('.')
        const usernameText = domain2[0].split(" ")[0]
        console.log(usernameText);
        newPage.close();
        await page.locator('#username').fill(usernameText);
        console.log(await page.locator('#username').textContent());
        });




   

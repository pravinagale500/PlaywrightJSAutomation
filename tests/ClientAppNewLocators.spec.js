
const { test, expect} = require('@playwright/test');


test('New Locators', async ({ page }) => {
    
    const productName = 'Zara Coat 3';
    const products = page.locator(".card-body");
    const email = 'anshika@gmail.com';

    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill('Iamking@000');
    await page.getByRole("button",{name: 'Login'}).click();
    //wait dynamically
    await page.waitForLoadState('networkidle');
    //alternate wait for only work for single element.
    // await page.locator(".card-body b").waitFor();
    //alternate wait 
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: productName}).getByRole("button",{name: "Add To Cart"}).click();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
   //  const productCount = await products.count();
   //  //Banarsi Saree - click on add to cart button 
   //  for(let i = 0; i < productCount; ++i)
   //  {  
   //  if(await products.nth(i).locator("b").textContent() === productName)
   //  {
   //         //add to cart
   //         await products.nth(i).locator("text = Add To Cart").click();
   //         break;
   //  }
   //  }
   //  await page.locator("[routerlink*='/dashboard/cart']").click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText(productName)).toBeVisible();
   //  const bool = await page.locator("h3:has-text('Banarsi Saree')").isVisible();
   //  expect(bool).toBeTruthy();
   // await page.locator(".btn.btn-danger").click();

   await page.getByRole("button",{name:"Checkout"}).click();
//dropdown button
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name:"India"}).nth(1).click();
   // const dropdown = await page.locator(".ta-results");
   // await dropdown.waitFor();
   // const dropdownOptions = await dropdown.locator("button").count();
   // for(let i = 0;i < dropdownOptions; ++i)
   //   {
   //     const  text = await dropdown.locator("button").nth(i).textContent();

   //      if(text === " India")
   //      {
   //            await dropdown.locator("button").nth(i).click(); 
   //            break;
   //      }
   //   }

//Assertion of Text
   //   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
     await page.getByText("PLACE ORDER").click();
     await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   //   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
     
   
   const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     console.log(orderID)


   //   //Order pagination scenarios
   await page.getByRole("button",{name:"ORDERS"}).click();
   //   await page.locator("button[routerlink='/dashboard/myorders']").click();
     await page.locator("tbody").waitFor();
     const orderRows = await page.locator("tbody tr");

     for(let i = 0; i < await orderRows.count(); ++i)
     {
        const rowOrderID = await orderRows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID))
        {
              await orderRows.nth(i).getByRole("button",{name:"View"}).first().click();
              break;
        }
     }
    const orderSumId = await page.locator(".col-text").textContent();
     expect(orderID.includes(orderSumId).toBeTruthy);

    page.close();
  });
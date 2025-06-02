import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';


//test('purchase an item', async ({ page }) => {
test('purchase an item in incognito mode', async () => {

//se agregaran 3 lineas 02 junio
//const browser = await chromium.launch({ headless: true }); // usa true en CI
const browser = await chromium.launch({ headless: process.env.CI ? true : false });
const context = await browser.newContext(); // modo incógnito
const page = await context.newPage();


await page.goto('https://www.saucedemo.com/');

//se agregara 1 lineas 02 junio
await page.waitForLoadState('networkidle');



const loginModule = new LoginPage(page)

await loginModule.loginWithCredentials("standard_user", "secret_sauce");
await loginModule.checkSuccessfulLogin();

//await page.screenshot({path: 'screenshots/login.png', fullPage:true});

const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

const randomIndex = Math.floor(Math.random() * itemsContainer.length);

const randomItem = itemsContainer[randomIndex];

const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
const expectedName = await randomItem.locator('.inventory_item_name').innerText();
const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

//se quito linea 02 junio
//console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`);

await randomItem.getByRole('button', { name: 'Add to cart' }).click();

await page.locator("a.shopping_cart_link").click();

await expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();

const actualName = await page.locator(".inventory_item_name").innerText();
const actualDescription = await page.locator(".inventory_item_desc").innerText();
const actualPrice = await page.locator(".inventory_item_price").innerText();

expect(actualName).toEqual(expectedName);
expect(actualDescription).toEqual(expectedDescription);
expect(actualPrice).toEqual(expectedPrice);

await page.getByRole('button', {name: 'Checkout'}).click();

//se quita del codigo 02 junio pero yo lo deje
await expect(page.getByRole('button', {name: 'Continue'})).toBeVisible();

await page.getByRole('textbox', {name: 'First Name'}).fill('Kanao');
await page.getByRole('textbox', {name: 'Last Name'}).fill('Tsuyuri');
await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('01000');


await page.getByRole('button', {name: 'Continue'}).click();
await page.getByRole('button', {name: 'Finish'}).click();

await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();

await page.pause();

});
import { test, expect } from '@playwright/test';

test('test web table', async ({ page }) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const tableContainer= await page.locator("xpath=//table[@id='countries']")

    const rows = await tableContainer.locator("xpath=.//tr").all();

    const countries: Country[] = [];

    console.log(rows.length);

    //por cada una de las filas me va a crear un OBJETO llamado country que tiene el contrato Country que tiene propiedades de name, etc
    //asi el td 2 lo almacena en name y asi sucesiva/
    for(let row of rows){

        let country: Country = {
            name: await row.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLanguage: await row.locator("xpath=.//td[5]").innerText(),
        }

    //con esto añades ese pais que usted creo arriba  
        countries.push(country);

     // y  a partir de aqui podemos hacer lo que queramos   
    }

    /*const row1 = rows.at(1);
    
    const countryName = await row1?.locator("xpath=.//td[2]").innerText();
    const countryCapital = await row1?.locator("xpath=.//td[3]").innerText();
    const countryCurrency = await row1?.locator("xpath=.//td[4]").innerText();

    console.log(countryName, countryCapital, countryCurrency);*/

    /*for(let country of countries){
        console.log(country);
    }*/

    const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage === "Portuguese");
    
    console.log("Countries where people speak portuguese", countryWherePeopleSpeakPortuguese);

});

interface Country{

    name:string;
    capital:string;
    currency:string;
    primaryLanguage:string;
}
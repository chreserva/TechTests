import { test, expect } from '@playwright/test';

test.describe('Glass Lewis DemoClient', () => {

  test('TC01 - Filter by Belgium country', async ({ page }) => {

    await page.goto(
      'https://viewpoint.glasslewis.com/WD/?siteId=DemoClient',
      { waitUntil: 'networkidle' }
    );

    const belgiumCheckbox = page.getByRole('checkbox', { name: 'Belgium' });
    await expect(belgiumCheckbox).toBeVisible();
    await belgiumCheckbox.check();

    const updateButton = page
      .getByLabel('Country Filter')
      .getByRole('button', { name: 'Update' });

    await expect(updateButton).toBeEnabled();
    await updateButton.click();

    await page.waitForLoadState('networkidle');

    await expect(belgiumCheckbox).toBeChecked();
  });


  test('TC02 - Search and redirect to Meeting Detail page', async ({ page }) => {

    await page.goto(
      'https://viewpoint.glasslewis.com/WD/?siteId=DemoClient',
      { waitUntil: 'networkidle' }
    );

    const searchBox = page.getByRole('combobox', {
      name: 'Search for a company'
    });

    await expect(searchBox).toBeVisible();
    await searchBox.fill('Activision Blizzard Inc');

    const option = page.getByRole('option', {
      name: /Activision Blizzard Inc/i
    });

    await expect(option).toBeVisible({ timeout: 10000 });

    
    await Promise.all([
      page.waitForURL(
        'https://viewpoint.glasslewis.com/WD/MeetingDetail/?siteId=DemoClient&securityId=17453',
        { timeout: 15000 }
      ),
      option.click()
    ]);

   
    await expect(page).toHaveURL(
      'https://viewpoint.glasslewis.com/WD/MeetingDetail/?siteId=DemoClient&securityId=17453'
    );
  });

});

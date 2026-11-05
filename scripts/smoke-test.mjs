import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';

const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
const base = `http://127.0.0.1:${server.httpServer.address().port}`;
let browser;
try {
  browser = await chromium.launch();
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, locale: 'nl-BE' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) {
        errors.push(`${response.status()} ${response.url()}`);
      }
    });
    await page.goto(base);
    await page.getByRole('heading', { name: 'Featured Projects' }).waitFor();
    const projects = await page.locator('a[href^="/project/"]').evaluateAll(links =>
      links.map(link => ({ href: link.getAttribute('href'), title: link.querySelector('h3').textContent })),
    );
    assert.equal(projects.length, 13);
    const cvLinks = page.locator('a[href*="canva.link"]');
    assert.ok(await cvLinks.count() > 0);
    for (const href of await cvLinks.evaluateAll(links => links.map(link => link.href))) {
      assert.equal(href, 'https://canva.link/vxnu27dtrlh5cq0');
    }
    await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click();
    await page.waitForFunction(() => scrollY > 0);
    if (width === 1440) {
      await page.getByRole('button', { name: 'Scroll right', exact: true }).click();
      await page.getByRole('button', { name: 'Scroll left', exact: true }).waitFor();
    }
    await page.locator('a[href^="/project/"]').first().click();
    await page.waitForURL(`${base}${projects[0].href}`);
    for (const project of projects) {
      await page.goto(`${base}${project.href}`);
      await page.getByRole('heading', { level: 1, name: project.title, exact: true }).waitFor();
      assert.ok((await page.title()).includes(project.title));
    }
    await page.locator('button').first().click();
    await page.waitForURL(`${base}/#projects`);
    for (const route of ['/missing', '/project/missing']) {
      await page.goto(`${base}${route}`);
      await page.getByRole('heading', { name: '404' }).waitFor();
      await page.getByRole('link', { name: 'Back to Home' }).click();
      await page.waitForURL(`${base}/`);
    }
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS ${width}px: 13 projects, navigation, carousel, CV links, 404, no browser/asset errors`);
  }
  const english = await browser.newPage({ locale: 'en-GB' });
  await english.goto(base);
  await english.locator('a[href*="canva.link"]').first().waitFor();
  for (const href of await english.locator('a[href*="canva.link"]').evaluateAll(links => links.map(link => link.href))) {
    assert.equal(href, 'https://canva.link/k8tnkckzwzj2ab1');
  }
  console.log('PASS English CV links');
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
}

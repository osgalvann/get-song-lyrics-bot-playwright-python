from hashlib import new
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://search.azlyrics.com/",wait_until='domcontentloaded')

    song = input("Song name?: ")
    page.locator("//input[@name='q']").first.fill(song)
    page.locator("//button[contains(.,'Search')]").first.click()

    rows = page.locator('tbody').first.locator("td")
    if rows.count() > 1:
        for i in range(rows.count()-1):
            text = rows.nth(i).inner_text()
            print(text)
        val = int(input("Select song: "))
        val-=1

    else:
        val = 0

    
    rows.nth(val).click()
    os.system("clear")
    songLyrics = page.locator("xpath=//body/div[@class='container main-page']/div[@class='row']/div[@class='col-xs-12 col-lg-8 text-center']/div[5]")
    for line in songLyrics.all_inner_texts():
        print(line)
    browser.close()
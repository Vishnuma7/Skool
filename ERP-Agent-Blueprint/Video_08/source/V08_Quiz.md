# Video 8 Quiz: Seeing Beyond the ERP
**Course:** The ERP Agent Blueprint | **Video:** 8 of 10 | **Questions:** 10

Answer each question, then check yourself against the Answer Key at the end. Take your time; there are no trick questions.

---

## Questions

**1. Why did Sarah's LED lights arrive eleven days late, even though Odoo said there was "plenty of time"?**
- A) Odoo had the wrong unit cost
- B) Odoo didn't know about outside events: Golden Week factory closures and a storm that closed the port
- C) Sarah typed the wrong quantity
- D) The supplier's API key had expired

**2. What do Open-Meteo, Frankfurter and Nager.Date have in common?**
- A) They are all ERP systems
- B) They each need a paid API key
- C) They are free outside APIs that need no key, so you can test them straight from your browser
- D) They only work inside Odoo

**3. In the Open-Meteo address, what do `latitude=22.54&longitude=114.06` tell the "waiter"?**
- A) The currency to use
- B) The map pin for the city we want the forecast for (Shenzhen)
- C) The number of days in the forecast
- D) The supplier's Odoo vendor ID

**4. Frankfurter doesn't serve the UAE dirham (AED), so Stocky only asks it for CNY and MXN. Why is that OK for the Dubai supplier?**
- A) The API is broken, so we should stop using it for every currency
- B) The dirham is pegged to the US dollar at about 3.67, so its dollar currency risk is about zero
- C) AED is the same as the Mexican peso
- D) The dirham only trades on weekends

**5. Using the course's rules, what is the risk band for a supplier scoring Weather 1, Holiday 2, Currency 1, Lead time 1?**
- A) LOW (0–3)
- B) MEDIUM (4–6)
- C) HIGH (7–10)
- D) It can't be scored

**6. When adding an HTTP Request Tool to the AI Agent, which box matters most for helping Stocky decide WHEN to use the tool?**
- A) The node colour
- B) The Description
- C) The Method (GET)
- D) The workflow name

**7. Scenario: Sarah opens `https://date.nager.at/api/v3/PublicHolidays/2026/AE` and gets a blank page. What should she conclude, and do?**
- A) The UAE has no public holidays in 2026, so the Holiday score for Gulf Lubricants is always 0
- B) Nager.Date doesn't cover the UAE; she should give Stocky a short written list of UAE holidays (like National Day, 2–3 Dec) in its instructions
- C) Her internet is down
- D) She needs to buy an API key

**8. Scenario: Stocky says "Shenzhen BrightTech: HIGH risk (8/10). Golden Week holiday + typhoon warning; order LED lights 10 days earlier." What is the BEST next step for Sarah?**
- A) Immediately triple the LED order without checking anything
- B) Ignore it, because AI can be wrong
- C) Treat it as guidance: check stock cover, confirm the factory's closure dates with the supplier, check the official weather service, then decide
- D) Cancel all orders from China

**9. True or False: The Supplier Risk Score is an accurate prediction of exactly which supplier will be late.**
- A) True
- B) False

**10. What is a "fire drill" in this video?**
- A) Testing the agent with a pretend emergency (e.g. "assume 110 km/h winds in Shenzhen") to check it reacts properly
- B) Deleting the workflow and starting again
- C) Turning off all the tools
- D) Sending the risk report to the fire brigade

---

## Answer Key

**1. B.** Odoo's lead-time field said 28 days, but it couldn't see the Golden Week shutdown or the storm. The information was public; it just wasn't inside the ERP.

**2. C.** All three are free and need no API key (no hotel key card), so you can paste the address into a browser and see the labelled shopping list (JSON) come back. Open-Meteo asks commercial users to take a paid plan, so check its terms before daily business use.

**3. B.** Latitude and longitude are the map pin. 22.54, 114.06 is Shenzhen; each supplier city has its own pair.

**4. B.** An API only serves what its kitchen stocks: Frankfurter uses European Central Bank rates, which don't include AED. Since the dirham is pegged to the dollar at about 3.67, the dollar-to-dirham move is about zero anyway, so we teach Stocky that fact in its rulebook.

**5. B.** 1 + 2 + 1 + 1 = 5 out of 10, which falls in the MEDIUM band (4–6).

**6. B.** The agent chooses tools by reading their descriptions. A clear description ("Gets the 7-day forecast for one supplier city; give it latitude and longitude") gets used correctly; a vague one gets ignored or misused.

**7. B.** Blank means "no data for this country", not "no holidays". Good agents work around gaps with written rules instead of guessing.

**8. C.** The score is guidance, not truth. It tells Sarah where to look today; she combines it with what she knows and makes the call.

**9. B (False).** Forecasts are guesses, holiday data has gaps and the rules are simple on purpose. The score points your attention; it doesn't predict the future. Review it monthly against what actually happened.

**10. A.** Like testing a smoke alarm, a fire drill feeds the agent a realistic "what if" to make sure it scores and explains a serious situation correctly before a real one happens.

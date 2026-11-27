# Video 3 Quiz: APIs Explained Like You're Ordering at a Restaurant
**Course:** The ERP Agent Blueprint | **Level:** Beginner | **Questions:** 10 | **Time:** about 10 minutes

Choose the best answer for each question. The answer key with explanations is at the end. Try the whole quiz first, no peeking!

---

## Questions

**1. In the restaurant analogy, what is the API?**
- A. The kitchen
- B. The waiter
- C. The customer
- D. The menu prices

**2. Look at this web address: `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06`. Which part is the endpoint (the "dish on the menu")?**
- A. `https://api.open-meteo.com`
- B. `/v1/forecast`
- C. `latitude=22.54`
- D. `&`

**3. What do the parts after the `?` in a web address (like `latitude=22.54&longitude=114.06`) do?**
- A. They are the password for the API
- B. They are the order details (parameters) that say exactly what you want
- C. They show the status code
- D. They tell the browser which language to use

**4. Which description of JSON matches what you saw in this video?**
- A. A programming language you must learn before using APIs
- B. An encrypted file that only computers can read
- C. A labelled shopping list: a label on the left, a value on the right
- D. A type of Excel chart

**5. The Open-Meteo response contains `"time": ["2026-11-22","2026-11-23","2026-11-24"]` and `"precipitation_sum": [0, 0.1, 48.4]`. How much rain is forecast on 24 November?**
- A. 0 mm
- B. 0.1 mm
- C. 48.4 mm
- D. You can't tell from this response

**6. True or False: Typing an API's web address into your browser and pressing Enter is a GET request, and it does not change anything in the system you asked.**
- A. True
- B. False

**7. Which of these tasks would be a POST request (submitting, not just asking)?**
- A. Checking today's USD to MXN exchange rate
- B. Reading the on-hand quantity of BL-1005 in Odoo
- C. Creating a new purchase order for 1,820 corrugated boxes from PackRight Industries
- D. Looking up the weather forecast for Dubai

**8. Stocky calls an API and gets back status code 401. What is the most likely problem?**
- A. The web address has a typo, so the "dish" wasn't found
- B. The API key (key card) is missing, wrong or cancelled
- C. Stocky is asking too many times per minute
- D. Everything worked fine

**9. Scenario: Sarah calls the Frankfurter API asking for USD to CNY, MXN and AED. The response only contains CNY and MXN. What should she do?**
- A. Assume the AED rate is zero and carry on
- B. Delete her browser history and try again in a week
- C. Notice that AED is missing, understand that this API's source doesn't provide it, and get the AED rate another way (it is pegged at about 3.67 per USD)
- D. Report the API as broken, because every API must return everything you ask for

**10. Scenario: Sarah's colleague asks her to paste BrightLeaf's Odoo API key into the team WhatsApp group "so everyone can use it". Following the hotel key card rules, what should she do?**
- A. Paste it, because WhatsApp is private
- B. Paste it, but delete the message after an hour
- C. Refuse; keys are never shared in chats. Each tool or person should get its own key, and any key that might have leaked should be deleted and replaced
- D. Change her Odoo password instead, so the key is safe

---

## Answer Key

**1. B. The waiter.** You (or Stocky) never walk into the kitchen (the ERP). You give your order to the waiter, the API, who brings back exactly what you asked for.

**2. B. `/v1/forecast`.** The first part is the restaurant's address, the endpoint is the specific dish (here, the forecast), and the part after `?` is your order details.

**3. B. They are the order details (parameters).** The `?` means "here come my order details" and each `&` means "and also". Change them (for example, the latitude and longitude) and you get a different answer.

**4. C. A labelled shopping list.** JSON is just labels and values, such as `"timezone": "Asia/Shanghai"`. Lists in square brackets line up like Excel columns.

**5. C. 48.4 mm.** The lists line up like columns: the third date (24 November) goes with the third rain number (48.4 mm). That's a seriously wet day, worth a call to Global Lift Parts.

**6. A. True.** Pasting an address into the browser is "asking" (GET). Asking about the weather never changes the weather, and it never changes the API's data either.

**7. C. Creating a new purchase order.** Creating or changing something in the kitchen is submitting (POST). The other three only read information. Important POSTs, like purchase orders, should need Sarah's approval.

**8. B. The API key is missing, wrong or cancelled.** 401 is the "wrong key card" receipt. A typo in the address is usually 404, and too many requests is 429.

**9. C. Notice the missing item and get it another way.** An API can only serve what its kitchen has. Frankfurter uses European Central Bank rates, which don't include the dirham. Always check that what came back matches what you asked for.

**10. C. Refuse and keep keys private.** An API key works like a password and a key card in one. Never share it in chats or emails, give each tool its own key, and cancel any key that might have leaked. Changing the password doesn't cancel an API key.

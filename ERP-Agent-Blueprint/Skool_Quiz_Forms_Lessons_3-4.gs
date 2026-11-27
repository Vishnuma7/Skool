/**
 * The ERP Agent Blueprint: builds the Lesson 3 and Lesson 4 Knowledge Check quizzes as Google Forms.
 * How to use: script.google.com > New project > paste this whole file > Save > select "createQuizzes" > Run.
 * Use a NEW project (not the one you used for Lessons 1-2), and run it only once.
 * The form links appear in the Execution log.
 */
const QUIZZES = [
  {
    "lesson": 3,
    "title": "APIs Explained Like You're Ordering at a Restaurant",
    "next": "Lesson 4",
    "items": [
      {
        "q": "1. In the restaurant analogy, what is the API?",
        "opts": [
          "The kitchen",
          "The waiter",
          "The customer",
          "The menu prices"
        ],
        "correct": 1,
        "why": "You (or Stocky) never walk into the kitchen (the ERP). You give your order to the waiter, the API, who brings back exactly what you asked for."
      },
      {
        "q": "2. Look at this web address: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06. Which part is the endpoint (the \"dish on the menu\")?",
        "opts": [
          "https://api.open-meteo.com",
          "/v1/forecast",
          "latitude=22.54",
          "&"
        ],
        "correct": 1,
        "why": "The first part is the restaurant's address, the endpoint is the specific dish (here, the forecast), and the part after ? is your order details."
      },
      {
        "q": "3. What do the parts after the ? in a web address (like latitude=22.54&longitude=114.06) do?",
        "opts": [
          "They are the password for the API",
          "They are the order details (parameters) that say exactly what you want",
          "They show the status code",
          "They tell the browser which language to use"
        ],
        "correct": 1,
        "why": "The ? means \"here come my order details\" and each & means \"and also\". Change them (for example, the latitude and longitude) and you get a different answer."
      },
      {
        "q": "4. Which description of JSON matches what you saw in this video?",
        "opts": [
          "A programming language you must learn before using APIs",
          "An encrypted file that only computers can read",
          "A labelled shopping list: a label on the left, a value on the right",
          "A type of Excel chart"
        ],
        "correct": 2,
        "why": "JSON is just labels and values, such as \"timezone\": \"Asia/Shanghai\". Lists in square brackets line up like Excel columns."
      },
      {
        "q": "5. The Open-Meteo response contains \"time\": [\"2026-11-22\",\"2026-11-23\",\"2026-11-24\"] and \"precipitation_sum\": [0, 0.1, 48.4]. How much rain is forecast on 24 November?",
        "opts": [
          "0 mm",
          "0.1 mm",
          "48.4 mm",
          "You can't tell from this response"
        ],
        "correct": 2,
        "why": "The lists line up like columns: the third date (24 November) goes with the third rain number (48.4 mm). That's a seriously wet day, worth a call to Global Lift Parts."
      },
      {
        "q": "6. True or False: Typing an API's web address into your browser and pressing Enter is a GET request, and it does not change anything in the system you asked.",
        "opts": [
          "True",
          "False"
        ],
        "correct": 0,
        "why": "Pasting an address into the browser is \"asking\" (GET). Asking about the weather never changes the weather, and it never changes the API's data either."
      },
      {
        "q": "7. Which of these tasks would be a POST request (submitting, not just asking)?",
        "opts": [
          "Checking today's USD to MXN exchange rate",
          "Reading the on-hand quantity of BL-1005 in Odoo",
          "Creating a new purchase order for 1,820 corrugated boxes from PackRight Industries",
          "Looking up the weather forecast for Dubai"
        ],
        "correct": 2,
        "why": "Creating or changing something in the kitchen is submitting (POST). The other three only read information. Important POSTs, like purchase orders, should need Sarah's approval."
      },
      {
        "q": "8. Stocky calls an API and gets back status code 401. What is the most likely problem?",
        "opts": [
          "The web address has a typo, so the \"dish\" wasn't found",
          "The API key (key card) is missing, wrong or cancelled",
          "Stocky is asking too many times per minute",
          "Everything worked fine"
        ],
        "correct": 1,
        "why": "401 is the \"wrong key card\" receipt. A typo in the address is usually 404, and too many requests is 429."
      },
      {
        "q": "9. Scenario: Sarah calls the Frankfurter API asking for USD to CNY, MXN and AED. The response only contains CNY and MXN. What should she do?",
        "opts": [
          "Assume the AED rate is zero and carry on",
          "Delete her browser history and try again in a week",
          "Notice that AED is missing, understand that this API's source doesn't provide it, and get the AED rate another way (it is pegged at about 3.67 per USD)",
          "Report the API as broken, because every API must return everything you ask for"
        ],
        "correct": 2,
        "why": "An API can only serve what its kitchen has. Frankfurter uses European Central Bank rates, which don't include the dirham. Always check that what came back matches what you asked for."
      },
      {
        "q": "10. Scenario: Sarah's colleague asks her to paste BrightLeaf's Odoo API key into the team WhatsApp group \"so everyone can use it\". Following the hotel key card rules, what should she do?",
        "opts": [
          "Paste it, because WhatsApp is private",
          "Paste it, but delete the message after an hour",
          "Refuse; keys are never shared in chats. Each tool or person should get its own key, and any key that might have leaked should be deleted and replaced",
          "Change her Odoo password instead, so the key is safe"
        ],
        "correct": 2,
        "why": "An API key works like a password and a key card in one. Never share it in chats or emails, give each tool its own key, and cancel any key that might have leaked. Changing the password doesn't cancel an API key."
      }
    ]
  },
  {
    "lesson": 4,
    "title": "Databases Without Fear: Your Data's Home",
    "next": "Lesson 5",
    "items": [
      {
        "q": "1. Using this course's analogy, what is a database?",
        "opts": [
          "A very large PDF file",
          "A super-organised Excel workbook, where tables are sheets, rows are records and columns are fields",
          "A folder of emails",
          "A type of AI model"
        ],
        "correct": 1,
        "why": "Tables are like sheets, rows are records (one thing each) and columns are fields (one type of information each). You already know most of this from Excel."
      },
      {
        "q": "2. In BrightLeaf's Stock_Log table, what does one row represent?",
        "opts": [
          "One field, such as \"Qty_On_Hand\"",
          "All products for one supplier",
          "One record: a single stock check for one SKU on one date",
          "The total stock in the warehouse"
        ],
        "correct": 2,
        "why": "A log adds a new row for every check and never overwrites old ones, like a ship's logbook. That's how Sarah can see trends later."
      },
      {
        "q": "3. Why is \"SUP-002\" a better way to identify PackRight Industries than the name \"PackRight Industries\"?",
        "opts": [
          "IDs look more professional",
          "IDs are shorter to type",
          "Names get spelled differently (\"Pack Right Ind.\", \"PACKRIGHT\"), but a unique ID never changes and never repeats, so totals and lookups stay correct",
          "Google Sheets doesn't allow names in cells"
        ],
        "correct": 2,
        "why": "PackRight existed three times under different spellings, which hid 41% of packaging spend. A unique ID, like a passport number, keeps every record pointing to the same supplier."
      },
      {
        "q": "4. Which cell follows the \"one fact per cell\" rule for the Qty_On_Hand column?",
        "opts": [
          "18 sets - urgent!",
          "approx 18",
          "18",
          "18 (see Tom's email)"
        ],
        "correct": 2,
        "why": "Only a clean number can be compared with the reorder point in a formula. The unit goes in the Unit column and comments go in the Note column."
      },
      {
        "q": "5. Why are merged cells dangerous in a data table?",
        "opts": [
          "They make the file larger",
          "Only the top cell of a merge actually holds the value, so when you sort, filter or let an agent read it, the other rows look empty",
          "Google Sheets can't print merged cells",
          "Merged cells are only a problem in Odoo"
        ],
        "correct": 1,
        "why": "Unmerge (Format > Merge cells > Unmerge) and copy the value down, so every row carries its own supplier."
      },
      {
        "q": "6. True or False: Colouring a cell red is a reliable way to tell an AI agent that a product is urgent.",
        "opts": [
          "True",
          "False"
        ],
        "correct": 1,
        "why": "Agents read values, not colours. If something is urgent, write \"urgent\" in a Note column."
      },
      {
        "q": "7. Which date format did we use in the Stock_Log, and why?",
        "opts": [
          "03/04/26, because it is the shortest",
          "\"Nov 16\", because it is friendly",
          "2026-11-16 (year-month-day), because it can't be misread in different countries and it sorts correctly",
          "Any format, because Google Sheets fixes it automatically"
        ],
        "correct": 2,
        "why": "\"03/04\" means 3 April in Mexico (and most of the world) and 4 March in the USA. Year-month-day is unambiguous for humans and machines, and it sorts in the right order."
      },
      {
        "q": "8. The messy export shows \"21 cartons (12 rolls each) + 8 loose\" for stretch wrap (BL-1003), whose reorder point is 200 rolls. What is the clean Qty_On_Hand, and what is the status?",
        "opts": [
          "21, REORDER",
          "260, OK",
          "12, REORDER",
          "200, REORDER"
        ],
        "correct": 1,
        "why": "21 cartons × 12 rolls + 8 loose rolls = 260 rolls, which is above the 200 reorder point. Reading \"21\" as rolls would trigger an unnecessary order of about 200 rolls (about $1,840)."
      },
      {
        "q": "9. Scenario: BrightLeaf stops buying from Gulf Lubricants (SUP-005). Sarah wants Stocky to stop checking them. What should she do in the Suppliers table?",
        "opts": [
          "Delete the SUP-005 row so it disappears",
          "Untick the \"Active\" checkbox for SUP-005, so the history still links to it but Stocky skips it",
          "Colour the row grey",
          "Change the Supplier_ID to \"OLD\""
        ],
        "correct": 1,
        "why": "Never delete records that old purchase orders and logs still point to. Mark them inactive instead, and the agent can skip them."
      },
      {
        "q": "10. Scenario: Sarah's Stock_Log has a formula =IF(D2<=F2,\"REORDER\",\"OK\"), but row 7 shows an error. Cell D7 contains \"31 - urgent!!\" for BL-1007 Hydraulic Oil (reorder point 40). What is the best fix?",
        "opts": [
          "Delete the formula",
          "Put 31 in D7 and move \"urgent\" into the Note column",
          "Make D7 bold so the formula notices it",
          "Merge D7 with the Note column"
        ],
        "correct": 1,
        "why": "One fact per cell keeps D7 a real number, so the formula works again: 31 is below the reorder point of 40, so it shows REORDER."
      }
    ]
  }
];

function createQuizzes() {
  QUIZZES.forEach(function (qz) {
    const form = FormApp.create('Lesson ' + qz.lesson + ' Knowledge Check: ' + qz.title);
    form.setIsQuiz(true)
      .setDescription('The ERP Agent Blueprint · Lesson ' + qz.lesson + '\n10 questions, about 10 minutes. You will see your score and the correct answers, with explanations, as soon as you submit. Got 8 or more? You are ready for ' + qz.next + '.')
      .setCollectEmail(false)
      .setLimitOneResponsePerUser(false)
      .setAllowResponseEdits(false)
      .setShowLinkToRespondAgain(true)
      .setProgressBar(true)
      .setConfirmationMessage('Thanks for completing the quiz! Click "View score" to see your result and the explanations. Then share your score in the Skool Community, and if you have any doubts, send me a DM on Skool.');
    form.addTextItem().setTitle('Your first name (optional)').setRequired(false);
    qz.items.forEach(function (it) {
      const item = form.addMultipleChoiceItem();
      item.setTitle(it.q)
        .setChoices(it.opts.map(function (o, i) { return item.createChoice(o, i === it.correct); }))
        .setPoints(1)
        .setRequired(true)
        .setFeedbackForCorrect(FormApp.createFeedback().setText('Correct! ' + it.why).build())
        .setFeedbackForIncorrect(FormApp.createFeedback().setText('Not quite. The right answer is: ' + it.opts[it.correct] + '. ' + it.why).build());
    });
    Logger.log('Lesson ' + qz.lesson + ' quiz: share this link in Skool > ' + form.getPublishedUrl());
    Logger.log('Lesson ' + qz.lesson + ' quiz: edit link (keep private) > ' + form.getEditUrl());
  });
}

/**
 * The ERP Agent Blueprint: builds the Lesson 1 and Lesson 2 Knowledge Check quizzes as Google Forms.
 * How to use: script.google.com > New project > paste this whole file > Save > select "createQuizzes" > Run.
 * Allow the permissions it asks for (it only creates forms in your Google Drive).
 * The form links appear in View > Logs (Execution log).
 */
const QUIZZES = [
  {
    "lesson": 1,
    "title": "Why Your ERP Needs an AI Agent",
    "next": "Lesson 2",
    "items": [
      {
        "q": "1. Which description best matches an AI agent?",
        "opts": [
          "A chat window where you type questions and get answers",
          "A fixed set of steps that run in the same order every time",
          "A smart new intern who can read, think, use tools and take action, but needs clear instructions and supervision",
          "A spreadsheet macro that formats your stock report"
        ],
        "correct": 2,
        "why": "An agent is like a smart new intern: it reads, thinks, uses the tools you give it and acts, but it needs clear instructions and supervision. A is a chatbot, B is an automation."
      },
      {
        "q": "2. Sarah asks ChatGPT, \"How many pallet jack wheels do we have in stock right now?\" Why can't it answer?",
        "opts": [
          "The question is too long",
          "On its own, a chatbot has no access to BrightLeaf's ERP, so it only knows what you type into it",
          "ChatGPT doesn't understand supply chain words",
          "Pallet jack wheels are not in Odoo"
        ],
        "correct": 1,
        "why": "A chatbot is a brilliant brain in a room with no doors. Unless you connect it to the ERP through tools, it can't look up live stock."
      },
      {
        "q": "3. BrightLeaf has a rule: \"If quantity on hand is below the reorder point, send an email.\" Every day, the steps are identical. What is the best fit?",
        "opts": [
          "A simple automation (a recipe card)",
          "An AI agent",
          "A chatbot",
          "A new ERP module"
        ],
        "correct": 0,
        "why": "The steps never change and the rule is clear, so a simple automation is cheaper, faster and more predictable than an agent. Save agents for tasks that need judgement."
      },
      {
        "q": "4. Which of these is NOT one of the five parts of every agent taught in this video?",
        "opts": [
          "Brain (the AI model, or LLM)",
          "Tools",
          "A printer",
          "Human supervisor"
        ],
        "correct": 2,
        "why": "The five parts are brain, instructions, tools, memory and a human supervisor. A printer is not one of them."
      },
      {
        "q": "5. In the Stocky demo, why did Stocky tell Sarah to order the pallet jack wheels (BL-1005) \"today\"?",
        "opts": [
          "Because they are the most expensive product",
          "Because Mr. Harrison asked for it",
          "Because the supplier is in Shenzhen, storms had hit Shenzhen, US Thanksgiving was coming (slow freight bookings), and the lead time is already 21 days",
          "Because the stock was at zero"
        ],
        "correct": 2,
        "why": "Stocky combined several signals: an overseas supplier, storms in Shenzhen, Thanksgiving slowing freight and a long lead time. That's judgement a fixed IF-rule can't make."
      },
      {
        "q": "6. What does \"LLM\" mean in this course, in plain terms?",
        "opts": [
          "The intern's brain: the type of AI that reads, reasons and writes language",
          "A type of ERP module for logistics",
          "The list of products below the reorder point",
          "A Google Sheet used for memory"
        ],
        "correct": 0,
        "why": "LLM stands for large language model. In our analogy, it's the intern's brain. On its own it can only think and write; tools let it act."
      },
      {
        "q": "7. Scenario: Sarah wants Stocky to start helping next week, but she is nervous about it spending money by mistake. What should she do first?",
        "opts": [
          "Give Stocky permission to send purchase orders directly, to save the most time",
          "Start with \"read and suggest\", and keep any spending action behind a human Approve button",
          "Wait until the AI is perfect before using it at all",
          "Let Tom approve everything instead"
        ],
        "correct": 1,
        "why": "Start with \"read and suggest\", then \"draft\", and keep \"send\" or \"spend\" behind a human approval. That's the manager's signature before the check goes out."
      },
      {
        "q": "8. Why does Stocky write its decisions into a Google Sheet (the \"Stocky_Decision_Log\")?",
        "opts": [
          "Because Odoo can't store numbers",
          "To give the agent memory and a record of what it decided and who approved it",
          "To make the email look nicer",
          "Because Google Sheets is the only free tool"
        ],
        "correct": 1,
        "why": "The log is Stocky's notebook. It lets the agent (and Mr. Harrison) look back at what was flagged, what was suggested and who approved it."
      },
      {
        "q": "9. Scenario: Sarah receives 40 supplier emails a week, each written differently. She needs to know which shipments are delayed and what that means for next week's stock. Which tool fits best?",
        "opts": [
          "A chatbot, because it can read text",
          "A simple automation with one IF rule",
          "An AI agent, because the task needs reading messy information, judgement and access to stock data",
          "Nothing, it can't be helped"
        ],
        "correct": 2,
        "why": "Every email is different and the answer must be connected to stock levels. That combination of reading, judging and using tools is exactly what agents are for."
      },
      {
        "q": "10. True or false: \"If your company uses SAP or Microsoft Dynamics instead of Odoo, the ideas in this course don't apply to you.\"",
        "opts": [
          "True",
          "False"
        ],
        "correct": 1,
        "why": "Every ERP has modules, records and fields, and most can be connected the same way. Odoo is used because it's free and safe to practise on."
      }
    ]
  },
  {
    "lesson": 2,
    "title": "ERP Demystified: A Supply Chain Pro's Tour of Odoo",
    "next": "Lesson 3",
    "items": [
      {
        "q": "1. Which everyday picture best describes an ERP?",
        "opts": [
          "A calculator on everyone's desk",
          "The company's central filing cabinet plus its rulebook, where every department keeps its records in one place",
          "A chat app for the warehouse team",
          "A folder of separate Excel files, one per department"
        ],
        "correct": 1,
        "why": "An ERP is one central filing cabinet plus a rulebook. Everyone reads and writes the same records, so there's one version of the truth."
      },
      {
        "q": "2. In the filing cabinet picture, what is a \"record\"?",
        "opts": [
          "The whole cabinet",
          "One drawer, such as Inventory",
          "One folder, such as one product or one purchase order",
          "One labelled box on a form, such as \"Cost\""
        ],
        "correct": 2,
        "why": "A record is one folder: one product, one supplier, one purchase order. The cabinet is the ERP, drawers are modules and labelled boxes are fields."
      },
      {
        "q": "3. In Excel terms, a field is most like:",
        "opts": [
          "A column",
          "A workbook",
          "A chart",
          "A password"
        ],
        "correct": 0,
        "why": "A record is like a row and a field is like a column. That's why your Excel skills transfer directly to ERPs and databases."
      },
      {
        "q": "4. Why is the \"Track Inventory\" tick box (or \"Storable Product\" in older versions) so important?",
        "opts": [
          "It makes the product cheaper",
          "Without it, Odoo doesn't count the product's stock, so reports and agents can't see an on-hand quantity",
          "It sends an email to the supplier",
          "It is only needed for products sold online"
        ],
        "correct": 1,
        "why": "Without inventory tracking, Odoo never counts the product. Any stock alert or agent will silently skip it, which is exactly what caused the \"garbage in, garbage out\" story in the video."
      },
      {
        "q": "5. Why should every product have an Internal Reference (SKU) like BL-1001?",
        "opts": [
          "Odoo will not save a product without one",
          "It makes the product appear first in the list",
          "Names get typed in different ways, but a consistent code always identifies the same product, for humans and agents",
          "It sets the reorder point automatically"
        ],
        "correct": 2,
        "why": "\"M10 bolts\" and \"Hex Bolt M10\" look different to a computer, but BL-1001 is always BL-1001. Agents rely on codes like this to avoid mix-ups."
      },
      {
        "q": "6. When importing products, what does the \"Test\" button do?",
        "opts": [
          "Imports the file twice to be safe",
          "Checks every row for problems without saving anything",
          "Deletes old products",
          "Emails the file to Odoo support"
        ],
        "correct": 1,
        "why": "Test checks the whole file and tells you which rows have problems, without saving anything. Always click Test before Import."
      },
      {
        "q": "7. Scenario: Sarah has already created BL-1001 by hand. She now wants to import the rest of the catalogue. What should she do?",
        "opts": [
          "Import all ten products, including BL-1001, then delete one later",
          "Import only BL-1002 to BL-1010, so she doesn't create a duplicate bolt record",
          "Type all the remaining products by hand to be safe",
          "Rename BL-1001 first so the import doesn't notice it"
        ],
        "correct": 1,
        "why": "Odoo would create a second bolt record if she imported BL-1001 again. Duplicates confuse people and agents, so import only what doesn't exist yet."
      },
      {
        "q": "8. A reorder rule for BL-1005 (Pallet Jack Wheels) has Min 25 and Max 50. On hand is 18. What does Odoo suggest ordering on the Replenishment screen (with no other orders open)?",
        "opts": [
          "7",
          "25",
          "32",
          "50"
        ],
        "correct": 2,
        "why": "The rule refills up to the Max: 50 minus 18 on hand = 32."
      },
      {
        "q": "9. Scenario: Tom says the stock of hydraulic oil looks wrong, and Sarah wants to see every movement in and out of the warehouse for that product. Where should she look?",
        "opts": [
          "The product's \"In / Out\" smart button (the moves history), which is its paper trail",
          "The Sales app's Quotations list",
          "The Settings app",
          "The Discuss chat"
        ],
        "correct": 0,
        "why": "The In / Out button shows every stock move with date, locations, quantity and user. That paper trail is what makes the ERP a rulebook, not just a list."
      },
      {
        "q": "10. True or false: \"An AI agent will fix bad ERP data on its own, so data quality matters less once you have one.\"",
        "opts": [
          "True",
          "False"
        ],
        "correct": 1,
        "why": "An agent makes bad data more dangerous, because it states wrong numbers confidently. Clean data is the foundation the agent stands on."
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

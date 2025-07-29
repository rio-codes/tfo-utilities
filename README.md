# tfo-utilities
## Utilities for The Final Outpost

This will be a collection of utilities for the web game [The Final Outpost](https://finaloutpost.net/), related to genetics and breeding. Currently I have only created a Punnett Square calculator function to determine the possible outcome of breeding hybrids that can be imported into Google Sheets.

## Punnett Square Calculator
### To Import into Google Apps Script
From within your Google Sheet, click the "Extensions" menu, then "Apps Script". Create a new project and call it "TFO Punnett Square Calculator". Then replace the text of Code.gs with the contents of the punnett_calculator.gs file in this repository. Click "Deploy", then "New Deployment". Click the gear next to "Select Type" and select "Library". Give it a description, such as "TFO Punnett Square Calculator" and click "Deploy".

### To Use in a Google Sheet
Inside a cell that you wish to contain the probability of a research goal, type `=PUNNETT(`, then select the cells with the genotype of each parent for your desired trait (for example "AabbCC" and "aaBbCc") followed by a cell containing your goal genotype. Finish with a `)`. It should look something like `=PUNNETT(K3,K5,K2)` in the formula bar at the top. To format the cell as a percentage, select it and then click the "Format" menu, and select "Number" -> "Percent".


# tfo-utilities
## Utilities for The Final Outpost

This will be a collection of utilities for the web game [The Final Outpost](https://finaloutpost.net/), related to genetics and breeding. Currently I have only created a Punnett Square calculator function to determine the possible outcome of breeding hybrids that can be imported into Google Sheets.

## Punnett Square Calculator
### To Import into Google Apps Script
From within your Google Sheet, click the "Extensions" menu, then "Apps Script". Create a new project and call it "TFO Punnett Square Calculator". Then replace the text of Code.gs with the contents of the punnett_calculator.gs file in this repository. Click "Deploy", then "New Deployment". Click the gear next to "Select Type" and select "Library". Give it a description, such as "TFO Punnett Square Calculator" and click "Deploy".

### To Use in a Google Sheet
Inside a cell that you wish to contain the probability of a research goal, type `=PUNNETT(`, then select the cells with the genotype of each parent for your desired trait (for example "AabbCC" and "aaBbCc") followed by a cell containing your goal genotype. Finish with a `)`. It should look something like `=PUNNETT(K3,K5,K2)` in the formula bar at the top. It will work with monohybrid, dihybrid, and trihybrid crosses and returns a probability as a decimal that the last value, your goal genotype, will be inherited. To format the cell as a percentage, select it and then click the "Format" menu, and select "Number" -> "Percent".

### Example Usage
In my spreadsheet, I have a separate sheet for each breeding goal, with two important tables. One is the table listing each creature with all of their traits and my research goal at the top. Here is a screenshot from my Nokta Voko log:
<img width="2209" height="329" alt="image" src="https://github.com/user-attachments/assets/498ed08d-b3ea-4061-ba41-fe9e8238d3f0" />

The second important table is the breeding predictions table. It has a row for each potential breeding pair and the results of a Punnett Square calculation for each trait. This is where you would use my `PUNNETT` utility function. Here is an example of my Nokta breeding table:
<img width="1348" height="398" alt="image" src="https://github.com/user-attachments/assets/7c56c22c-f991-47fb-ae5a-7dd716617f8e" />

You may choose to add a column that averages all the percentages to give you a general idea which pairs to breed to reach your goal, using the `AVERAGE` function. I don't have this column for my Noktos yet because none of my pairings are very viable for reaching my goal.

If you have feedback or questions you can contact me at [rio.savvii@gmail.com](mailto:rio.savvii@gmail.com).

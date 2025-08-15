/**
 * Calculates probability of possible genotypes (e.g. AaBBcc) for monohybrid, dihybrid, and trihybrid crosses using Punnett squares
 *
 * @param {string} genotype_parent1 The genotype of the first parent
 * @param {string} genotype_parent2 The genotype of the second parent
 * @param {string} [genotype_goal] The genotype of the goal offspring if only one exists
 * @param {string} [species_if_multiple] The species if goal trait has multiple genotypes
 * @param {string} [trait_if_multiple] The goal trait if species is specified
 * @param {string} [goal_if_multiple] The goal phenotype if trait is specified
 * @return The probability of the goal genotype being produced
 * @customfunction
 */
function PUNNETT(genotype_parent1, genotype_parent2, genotype_goal = "", species_if_multiple = "", trait_if_multiple = "", goal_if_multiple = "") {
  const genotype = new Map();
  const alleles_monohybrid = [];
  const alleles_dihybrid = [];
  const alleles_trihybrid = [];

  // initialize goal probability if multiple genotypes for trait
  if (genotype_goal == "") {
    let goal_probability = goal_if_multiple.concat("_probability");
    genotype[goal_probability] = 0;
  }

  // make sure inputs are both monohybrid, dihybrid, or trihybrid
  if ((genotype_parent1.length == genotype_parent2.length) && [2, 4, 6].includes(genotype_parent1.length && genotype_parent2.length))  {
    if ((genotype_goal != "" && [2, 4, 6].includes(genotype_goal.length) || (genotype_goal == ""))) {
      // calculate monohybrid crosses
      if (genotype_parent1.length == 2) {
        
        // create array of all possible monohybrid alleles
        let i = 0;
        let current_allele = ""
        let all_monohybrid_alleles = []
        current_allele = ""

        for (a = 0; a < 2; a++) {
          for (b = 0; b < 2; b++) {
            if (a == 0) {
                current_allele = current_allele.concat("A")
            }
            else if (a == 1) {
                current_allele = current_allele.concat("a")
            }
            if (b == 0) {
                current_allele = current_allele.concat("a")
            }
            else if (b == 1) {
                current_allele = current_allele.concat("A")
            }

            // sort current allele by capitalization
            all_monohybrid_alleles[i] = Array.from(current_allele);
            all_monohybrid_alleles[i].sort((f,g) => {
              return f.localeCompare(g, undefined, { caseFirst: 'upper' });
            });
            all_monohybrid_alleles[i] = all_monohybrid_alleles[i].join("");

            // fill genotype probability array with 0
            const allele_probability = all_monohybrid_alleles[i].concat("_probability");
            genotype[allele_probability] = 0;

            // fill genotype counter array with 0
            const allele_count = all_monohybrid_alleles[i].concat("_count");
            genotype[allele_count] = 0;
            
            current_allele = "";
            i++;
          }
        }


        // combine alleles from each parent to create all possible monohybrid combinations
        for (let j = 0; j < genotype_parent1.length; j++) {
          for (let k = 0; k < genotype_parent2.length; k++) {
            if (genotype_parent1[j].toUpperCase() == genotype_parent2[k].toUpperCase()) {
              if (genotype_parent1[j] == genotype_parent1[j].toUpperCase() && genotype_parent2[k] != genotype_parent2[k].toUpperCase()) {
                alleles_monohybrid.push(genotype_parent1[j].concat(genotype_parent2[k]));
              }
              else if (genotype_parent1[j] != genotype_parent1[j].toUpperCase() && genotype_parent2[k] == genotype_parent2[k].toUpperCase()) {
                alleles_monohybrid.push(genotype_parent2[k].concat(genotype_parent1[j]));
              }
              else {
                alleles_monohybrid.push(genotype_parent1[j].concat(genotype_parent2[k]));
              }
            }
          }
        }
      }
      // calculate dihybrid crosses
      else if (genotype_parent1.length == 4) {
        let dihybrid_alleles_parent1 = [];
        let dihybrid_alleles_parent2 = [];
        let alleles_dihybrid_p1 = [];
        let alleles_dihybrid_p2 = [];
        let alleles_dihybrid_combined = [];
        let sorted_dihybrid_alleles = [];

        // create array of all possible dihybrid alleles
        let i = 0;
        let current_allele = ""
        let all_dihybrid_alleles = []
        current_allele = ""

        for (a = 0; a < 4; a++) {
          for (b = 0; b < 4; b++) {
            if (a == 0) {
                current_allele = current_allele.concat("Aa")
            }
            else if (a == 1) {
                current_allele = current_allele.concat("AA")
            }
            else if (a == 2) {
                current_allele = current_allele.concat("aa")
              }
            else if (a == 3) {
                current_allele = current_allele.concat("aA")
            } 
            if (b == 0) {
                current_allele = current_allele.concat("Bb")
            }
            else if (b == 1) {
                current_allele = current_allele.concat("BB")
            }
            else if (b == 2) {
                current_allele = current_allele.concat("bb")
              }
            else if (b == 3) {
                current_allele = current_allele.concat("bB")
            }

            // sort current allele by capitalization
            all_dihybrid_alleles[i] = Array.from(current_allele);
            all_dihybrid_alleles[i].sort((d,e) => {
              return d.localeCompare(e, undefined, { caseFirst: 'upper' });
            });
            all_dihybrid_alleles[i] = all_dihybrid_alleles[i].join("");

            // fill genotype probability array with 0
            const allele_probability = all_dihybrid_alleles[i].concat("_probability");
            genotype[allele_probability] = 0;

            // fill genotype counter array with 0
            const allele_count = all_dihybrid_alleles[i].concat("_count");
            genotype[allele_count] = 0;
            
            current_allele = "";
            i++;
          }
        }
        

        // determine each allele from input genotypes
        dihybrid_alleles_parent1[0] = genotype_parent1.slice(0,2);
        dihybrid_alleles_parent1[1] = genotype_parent1.slice(2);
        dihybrid_alleles_parent2[0] = genotype_parent2.slice(0,2);
        dihybrid_alleles_parent2[1] = genotype_parent2.slice(2);

        // create array of dihybrid alleles for each parent
        alleles_dihybrid_p1[0] = genotype_parent1[0].concat(genotype_parent1[2]);
        alleles_dihybrid_p1[1] = genotype_parent1[0].concat(genotype_parent1[3]);
        alleles_dihybrid_p1[2] = genotype_parent1[1].concat(genotype_parent1[2]);
        alleles_dihybrid_p1[3] = genotype_parent1[1].concat(genotype_parent1[3]);

        alleles_dihybrid_p2[0] = genotype_parent2[0].concat(genotype_parent2[2]);
        alleles_dihybrid_p2[1] = genotype_parent2[0].concat(genotype_parent2[3]);
        alleles_dihybrid_p2[2] = genotype_parent2[1].concat(genotype_parent2[2]);
        alleles_dihybrid_p2[3] = genotype_parent2[1].concat(genotype_parent2[3]);

        // generate arrays of possible dihybrid combinations
        for (let l = 0; l < 4; l++) {
          for (let m = 0; m < 4; m++) {
            alleles_dihybrid_combined[l] = alleles_dihybrid_p1[l].concat(alleles_dihybrid_p2[m]);
            sorted_dihybrid_alleles[l] = Array.from(alleles_dihybrid_combined[l]);
            sorted_dihybrid_alleles[l].sort((a,b) => {
                return a.localeCompare(b, undefined, { caseFirst: 'upper' });
            });
            sorted_dihybrid_alleles[l] = sorted_dihybrid_alleles[l].join("");
            alleles_dihybrid.push(sorted_dihybrid_alleles[l]);
          }
        }
      }

      // calculate trihybrid crosses
      else if (genotype_parent1.length == 6) {
        let all_trihybrid_alleles = [];
        let trihybrid_alleles_parent1 = [];
        let trihybrid_alleles_parent2 = [];
        let alleles_trihybrid_p1 = [];
        let alleles_trihybrid_p2 = [];
        let alleles_trihybrid_combined = [];
        let sorted_trihybrid_alleles = [];

        // create array of all possible trihybrid alleles
        let i = 0;
        let current_allele = ""
        let unsorted_trihybrid_alleles = ""
        current_allele = ""
        for (a = 0; a < 4; a++) {
          for (b = 0; b < 4; b++) {
            for (c = 0; c < 4; c++) {
              // add alleles to current trihybrid allele
              if (a == 0) {
                  current_allele = current_allele.concat("Aa")
              }
              else if (a == 1) {
                  current_allele = current_allele.concat("AA")
              }
              else if (a == 2) {
                  current_allele = current_allele.concat("aa")
                }
              else if (a == 3) {
                  current_allele = current_allele.concat("aA")
              } 
              if (b == 0) {
                  current_allele = current_allele.concat("Bb")
              }
              else if (b == 1) {
                  current_allele = current_allele.concat("BB")
              }
              else if (b == 2) {
                  current_allele = current_allele.concat("bb")
                }
              else if (b == 3) {
                  current_allele = current_allele.concat("bB")
              }
              if (c == 0) {
                  current_allele = current_allele.concat("Cc")
              }
              else if (c == 1) {
                  current_allele = current_allele.concat("CC")
              }
              else if (c == 2) {
                  current_allele = current_allele.concat("cc")
                }
              else if (c == 3) {
                  current_allele = current_allele.concat("cC")
              }

              // sort current allele by capitalization
              all_trihybrid_alleles[i] = Array.from(current_allele);
              all_trihybrid_alleles[i].sort((d,e) => {
                return d.localeCompare(e, undefined, { caseFirst: 'upper' });
              });
              all_trihybrid_alleles[i] = all_trihybrid_alleles[i].join("");

              // fill genotype probability array with 0
              const allele_probability = all_trihybrid_alleles[i].concat("_probability");
              genotype[allele_probability] = 0;

              // fill genotype counter array with 0
              const allele_count = all_trihybrid_alleles[i].concat("_count");
              genotype[allele_count] = 0;
              
              current_allele = "";
              i++;
            }
          }
        }

        // determine each allele from input genotypes
        trihybrid_alleles_parent1[0] = genotype_parent1.slice(0,2);
        trihybrid_alleles_parent1[1] = genotype_parent1.slice(2,4);
        trihybrid_alleles_parent1[2] = genotype_parent1.slice(4);
        trihybrid_alleles_parent2[0] = genotype_parent2.slice(0,2);
        trihybrid_alleles_parent2[1] = genotype_parent2.slice(2,4);
        trihybrid_alleles_parent2[2] = genotype_parent2.slice(4);

        // create array of trihybrid alleles for each parent
        alleles_trihybrid_p1[0] = genotype_parent1[0].concat(genotype_parent1[2], genotype_parent1[4]);
        alleles_trihybrid_p1[1] = genotype_parent1[0].concat(genotype_parent1[2], genotype_parent1[5]);
        alleles_trihybrid_p1[2] = genotype_parent1[0].concat(genotype_parent1[3], genotype_parent1[4]);
        alleles_trihybrid_p1[3] = genotype_parent1[0].concat(genotype_parent1[3], genotype_parent1[5]);
        alleles_trihybrid_p1[4] = genotype_parent1[1].concat(genotype_parent1[2], genotype_parent1[4]);
        alleles_trihybrid_p1[5] = genotype_parent1[1].concat(genotype_parent1[2], genotype_parent1[5]);
        alleles_trihybrid_p1[6] = genotype_parent1[1].concat(genotype_parent1[3], genotype_parent1[4]);
        alleles_trihybrid_p1[7] = genotype_parent1[1].concat(genotype_parent1[3], genotype_parent1[5]);

        alleles_trihybrid_p2[0] = genotype_parent2[0].concat(genotype_parent2[2], genotype_parent2[4]);
        alleles_trihybrid_p2[1] = genotype_parent2[0].concat(genotype_parent2[2], genotype_parent2[5]);
        alleles_trihybrid_p2[2] = genotype_parent2[0].concat(genotype_parent2[3], genotype_parent2[4]);
        alleles_trihybrid_p2[3] = genotype_parent2[0].concat(genotype_parent2[3], genotype_parent2[5]);
        alleles_trihybrid_p2[4] = genotype_parent2[1].concat(genotype_parent2[2], genotype_parent2[4]);
        alleles_trihybrid_p2[5] = genotype_parent2[1].concat(genotype_parent2[2], genotype_parent2[5]);
        alleles_trihybrid_p2[6] = genotype_parent2[1].concat(genotype_parent2[3], genotype_parent2[4]);
        alleles_trihybrid_p2[7] = genotype_parent2[1].concat(genotype_parent2[3], genotype_parent2[5]);

        // generate arrays of possible trihybrid combinations
        for (let x = 0; x < alleles_trihybrid_p1.length; x++) {
          for (let y = 0; y < alleles_trihybrid_p1.length; y++) {
            for (let z = 0; z < alleles_trihybrid_p2.length; z++) {
              alleles_trihybrid_combined[x] = alleles_trihybrid_p1[y].concat(alleles_trihybrid_p2[z]);
              sorted_trihybrid_alleles[x] = Array.from(alleles_trihybrid_combined[x]);
              sorted_trihybrid_alleles[x].sort((a,b) => {
                  return a.localeCompare(b, undefined, { caseFirst: 'upper' });
              });
              sorted_trihybrid_alleles[x] = sorted_trihybrid_alleles[x].join("");
              alleles_trihybrid.push(sorted_trihybrid_alleles[x]);
              const allele_probability = sorted_trihybrid_alleles[x].concat("_probability");
              genotype[allele_probability] = 0
            }
          }
        }
      }

      // set generic allele array for mono, di, and trihybrid
      if (genotype_parent1.length == 2) {
        alleles_hybrid_any = alleles_monohybrid;
      }
      else if (genotype_parent1.length == 4) {
        alleles_hybrid_any = alleles_dihybrid;
      }
      else if (genotype_parent1.length == 6) {
        alleles_hybrid_any = alleles_trihybrid;
      }

      // generate set of unique alleles
      const unique_alleles = new Set(alleles_hybrid_any);

      // helper function to set genotype map
      function set_genotype(unique_allele) {
        const allele_count = unique_allele.concat("_count");
        genotype[allele_count] = 0;
        for (let z = 0; z < alleles_hybrid_any.length; z++) {
          if (alleles_hybrid_any[z] == unique_allele) {
            genotype[allele_count]++;
          }
        }
        const probability = unique_allele.concat("_probability");
        genotype[probability] = genotype[allele_count] / alleles_hybrid_any.length;
      }

      // set count and probability for each unique allele
      unique_alleles.forEach(set_genotype);

      // If species is Ebena and desired goal has multiple phenotypes, add probabilities
      if (species_if_multiple.toUpperCase() == "EBENA KURANTO" || species_if_multiple.toUpperCase() == "EBENA") {
        if (trait_if_multiple.toUpperCase().includes("BODY")) {
          if (goal_if_multiple.toUpperCase() == "CHESTNUT") {
            genotype["goal_probability"] = genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "LIGHT GRAY") {
            genotype["goal_probability"] = genotype["AABbCC_probability"] + genotype["AAbbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "WHITE") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AAbbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "BLACK") {
            genotype["goal_probability"] = genotype["aaBbCc_probability"] + genotype["aabbCc_probability"]
          }
          else {
            return "Invalid choice for Body trait, must be Chestnut, Light Gray, White, or Black"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("MARKING")) {
          if (goal_if_multiple.toUpperCase() == "DAPPLE") {
            genotype["goal_probability"] = genotype["AABbcc_probability"] + genotype["AaBbcc_probability"] + genotype["aaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SOOTY") {
            genotype["goal_probability"] = genotype["AAbbCc_probability"] + genotype["aabbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABBCc_probability"] + genotype["AABBCc_probability"] + genotype["AABbCC_probability"] + genotype["AABbCc_probability"] + genotype["AAbbCC_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBCc_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"] + genotype["aaBBcc_probability"] + genotype["aaBbCC_probability"] + genotype["aaBbCc_probability"] + genotype["aabbCC_probability"]
          }
          else {
            return "Invalid choice for Marking trait, must be Dapple, Sooty, or None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("FEET")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABbCC_probability"] + genotype["AABbCc_probability"] + genotype["AAbbCC_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"] + genotype["AABbCc_probability"] + genotype["AAbbCC_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBbCC_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else {
            return "Invalid choice for Feet trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("PINTO")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABBcc_probability"] + genotype["AABbCC_probability"] + genotype["AABbcc_probability"] + genotype["AAbbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AAbbcc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBbCC_probability"] + genotype["aaBBCc_probability"] + genotype["aaBbCC_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else {
            return "Invalid choice for Pinto trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("LEOPARD")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AABBcc_probability"] + genotype["AABbCc_probability"] + genotype["AABbcc_probability"] + genotype["AAbbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AAbbcc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AaBBCc_probability"] + genotype["AaBbCC_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCc_probability"] + genotype["aaBBcc_probability"] + genotype["aaBbCC_probability"] + genotype["aaBbCc_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCC_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else {
            return "Invalid choice for Leopard trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("FACE")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABBCc_probability"] + genotype["AABBcc_probability"] + genotype["AABbCc_probability"] + genotype["AABbcc_probability"] + genotype["AAbbCC_probability"] + + genotype["AAbbCc_probability"] + genotype["AAbbcc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBCc_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"] + genotype["aaBBcc_probability"] + genotype["aaBbCc_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCC_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "BALDFACE") {
            genotype["goal_probability"] = genotype["AaBbCC_probability"] + genotype["AABbCC_probability"] + genotype["aaBbCC_probability"]
          }
          else {
            return "Invalid choice for Face trait, must be Baldface or None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("MANE")) {
          if (goal_if_multiple.toUpperCase() == "SHORT BLONDE") {
            genotype["goal_probability"] = genotype["AABbCC_probability"] + genotype["AABBCc_probability"] + genotype["AABBcc_probability"] + genotype["AABbCc_probability"] + genotype["AAbbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SHORT CHESTNUT") {
            genotype["goal_probability"] = genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SHORT BLACK") {
            genotype["goal_probability"] = genotype["aaBBCC_probability"] + genotype["aaBbCc_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCC_probability"]
          }
          else {
            return "Invalid choice for Mane trait, must be Short Blonde, Short Chestnut, or Short Black."
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("HORN")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABBCc_probability"] + genotype["AABbCC_probability"] + genotype["AABbCc_probability"] + genotype["AABbcc_probability"] + genotype["AAbbCC_probability"] + + genotype["AAbbCc_probability"] + genotype["AAbbcc_probability"] + genotype["AaBBCc_probability"] + genotype["AaBBCC_probability"] + + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"] + + genotype["aaBbCC_probability"] + genotype["aaBbCc_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCC_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else {
            return "Invalid choice for Horns trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("WING")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCC_probability"] + genotype["AABBcc_probability"] + genotype["AABbCC_probability"] + genotype["AABbCc_probability"] + genotype["AABbcc_probability"] + genotype["AAbbCC_probability"] + + genotype["AAbbCc_probability"] + genotype["AAbbcc_probability"] + genotype["AaBBCc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCc_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBcc_probability"] + genotype["aaBbCc_probability"] + genotype["aaBbCC_probability"] + genotype["aaBbcc_probability"] + genotype["aabbCC_probability"] + genotype["aabbCc_probability"] + genotype["aabbcc_probability"]
          }
          else {
            return "Invalid choice for Wings trait, must be None"
          }
        }
        return genotype["goal_probability"];
      }
      else if (species_if_multiple.toUpperCase() == "SENCESA SIMFONIO" || species_if_multiple.toUpperCase() == "SENCESA") {
        if (trait_if_multiple.toUpperCase().includes("OVERLAY")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = 1 - (genotype["AABBCC_probability"] + genotype["aabbcc_probability"])
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("PATTERN")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["Aabb_probability"]
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("LEGS")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["Aabb_probability"] + genotype["aabb_probability"]
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("WING")) {
          if (goal_if_multiple.toUpperCase() == "DARK") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "DARK SHORT") {
            genotype["goal_probability"] = genotype["AABBcc_probability"] + genotype["AaBBcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "DARK AND RED") {
            genotype["goal_probability"] = genotype["AABbCC_probability"] + genotype["AABbCc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "RED") {
            genotype["goal_probability"] = genotype["AAbbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AabbCC_probability"] + genotype["AabbCb_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "RED SHORT") {
            genotype["goal_probability"] = genotype["AAbbcc_probability"] + genotype["Aabbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "BLUE") {
            genotype["goal_probability"] = genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "GOLD") {
            genotype["goal_probability"] = genotype["aaBbCC_probability"] + genotype["aaBbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "LIGHT") {
            genotype["goal_probability"] = genotype["aabbCC_probability"] + genotype["aabbCc_probability"]
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("SHIELD")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["Aabb_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "STRIPES") {
            genotype["goal_probability"] = genotype["aaBB_probability"] + genotype["aaBb_probability"]
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("EYES")) {
          if (goal_if_multiple.toUpperCase() == "DARK") {
            genotype["goal_probability"] = genotype["AABB_probability"] + genotype["AABb_probability"] + genotype["AaBB_probability"] + genotype["AaBb_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "BLUE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["Aabb_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "RED") {
            genotype["goal_probability"] = genotype["aaBB_probability"] + genotype["aaBb_probability"]
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("HORN")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["Aabb_probability"]
          }
        }
      }
      else if (species_if_multiple.toUpperCase() == "STEPA SAFIDO" || species_if_multiple.toUpperCase() == "STEPA") {
        if (trait_if_multiple.toUpperCase().includes("BODY")) {
          if (goal_if_multiple.toUpperCase() == "STORMS") {
            genotype["goal_probability"] = genotype["AaBBCc_probability"] + genotype["AabbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "STEPPES") {
            genotype["goal_probability"] = genotype["AabbCc_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "GALES") {
            genotype["goal_probability"] = genotype["AaBbCC_probability"] + genotype["AaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "NIGHT") {
            genotype["goal_probability"] = genotype["AaBBCC_probability"] + genotype["Aabbcc_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Body trait, must be Storms, Steppes, Gales, or Night"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("PATTERN")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AABbCC_probability"] + genotype["AAbbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCC_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"] + genotype["aaBBCc_probability"] + genotype["aaBbCC_probability"] + genotype["aabbCc_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Pattern A or B trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("LEGS")) {
          if (goal_if_multiple.toUpperCase() == "BLACK") {
            genotype["goal_probability"] = genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Front or Rear Leg trait, must be Black"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("MANE")) {
          if (goal_if_multiple.toUpperCase() == "SHADOWS") {
            genotype["goal_probability"] = genotype["AAbbCC_probability"] + genotype["AaBBCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "STEPPES") {
            genotype["goal_probability"] = genotype["AaBbCC_probability"] + genotype["AaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SQUALLS") {
            genotype["goal_probability"] = genotype["AabbCc_probability"] + genotype["aaBBCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AABbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AAbbCc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCc_probability"] + genotype["aaBbCC_probability"] + genotype["aabbCc_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Front or Rear Mane trait, must be Shadows, Steppes, Squalls, or None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("HEAD")) {
          if ((goal_if_multiple.toUpperCase().includes("BLACK")) && (!trait_if_multiple.toUpperCase().includes("EARS"))) {
            genotype["goal_probability"] = genotype["AABbCc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbCc_probability"] + genotype["AaBbcc_probability"]
          }
          else if ((goal_if_multiple.toUpperCase().includes("BLACK")) && (trait_if_multiple.toUpperCase().includes("EARS"))) {
            genotype["goal_probability"] = genotype["AAbbcc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"]
          }
          else if ((goal_if_multiple.toUpperCase().includes("WHITE")) && (!trait_if_multiple.toUpperCase().includes("EARS"))) {
            genotype["goal_probability"] = genotype["AaBBCc_probability"] + genotype["AabbCc_probability"] + genotype["aaBbCc_probability"]
          }
          else if ((goal_if_multiple.toUpperCase().includes("WHITE")) && (trait_if_multiple.toUpperCase().includes("EARS"))) {
            genotype["goal_probability"] = genotype["AabbCC_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCC_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Head trait, must be Black, White, Ears Black, or Ears White"
          }
        }
        else if ((trait_if_multiple.toUpperCase().includes("TUFT")) || (trait_if_multiple.toUpperCase().includes("EAR"))) {
          if (goal_if_multiple.toUpperCase() == "SHADOWS") {
            genotype["goal_probability"] = genotype["AAbbCC_probability"] + genotype["AaBBCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "STEPPES") {
            genotype["goal_probability"] = genotype["AaBbCC_probability"] + genotype["AaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SQUALLS") {
            genotype["goal_probability"] = genotype["AabbCc_probability"] + genotype["aaBBCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["AABbCC_probability"] + genotype["AAbbCc_probability"] + genotype["AAbbCc_probability"] + genotype["AaBBCC_probability"] + genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"] + genotype["Aabbcc_probability"] + genotype["aaBBCc_probability"] + genotype["aaBbCC_probability"] + genotype["aabbCc_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Ear Tufts trait, must be Shadows, Steppes, Squalls, or None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("EYE")) {
          if (goal_if_multiple.toUpperCase() == "SHADOWS") {
            genotype["goal_probability"] = genotype["AaBBCC_probability"] + genotype["Aabbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "BOLTS") {
            genotype["goal_probability"] = genotype["AAbbCC_probability"] + genotype["aaBBcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "GROWTHS") {
            genotype["goal_probability"] = genotype["AABbcc_probability"] + genotype["aaBbCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "NEBULAS") {
            genotype["goal_probability"] = genotype["AABbCc_probability"] + genotype["aaBbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "FLAMES") {
            genotype["goal_probability"] = genotype["AABbCC_probability"] + genotype["aaBbcc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "CRAGS") {
            genotype["goal_probability"] = genotype["AABBcc_probability"] + genotype["aabbCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SALTS") {
            genotype["goal_probability"] = genotype["AABBCc_probability"] + genotype["aabbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "SQUALLS") {
            genotype["goal_probability"] = genotype["AaBBCc_probability"] + genotype["AaBbCC_probability"] + genotype["AaBbcc_probability"] + genotype["AabbCc_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "STEPPES") {
            genotype["goal_probability"] = genotype["AaBBcc_probability"] + genotype["AaBbCc_probability"] + genotype["AabbCC_probability"]
          }
          else if (goal_if_multiple.toUpperCase() == "WHORLS") {
            genotype["goal_probability"] = genotype["AAbbcc_probability"] + genotype["aaBBCC_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Eyes trait, must be Shadows, Bolts, Growths, Nebulas, Flames, Crags, Salts, Steppes, Squalls, or Whorls"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("TAIL")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AAbb_probability"] + genotype["AaBB_probability"] + genotype["AaBb_probability"] + genotype["Aabb_probability"] + genotype["aaBB_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Tail trait, must be None"
          }
        }
        else if (trait_if_multiple.toUpperCase().includes("HORN")) {
          if (goal_if_multiple.toUpperCase() == "NONE") {
            genotype["goal_probability"] = genotype["AABb_probability"] + genotype["AaBB_probability"] + genotype["AaBb_probability"] + genotype["Aabb_probability"] + genotype["aaBb_probability"]
          }
          else {
            return "Invalid choice for multiple-gene Horn trait, must be None"
          }
        }
        else {
          return "Invalid choice for multiple-gene trait, must be Body, Pattern, Legs, Mane, Head, Ear Tufts, Eyes, Tail, or Horn."
        }
      }
      if (species_if_multiple == "") {
        const single_goal_probability = genotype_goal.concat("_probability")
        return genotype[single_goal_probability]
      }
      else {
        return genotype["goal_probability"]
      }
    } else {
      return "INVALID"
    }
  } else {
    return "INVALID"
  }
}
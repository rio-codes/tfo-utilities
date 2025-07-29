/**
 * Calculates probability of possible genotypes (e.g. AaBBcc) for monohybrid, dihybrid, and trihybrid crosses using Punnett squares
 *
 * @param {string} genotype_parent1 The genotype of the first parent
 * @param {string} genotype_parent2 The genotype of the second parent
 * @param {string} genotype_goal The genotype of the goal offspring
 * @return The probability of the goal genotype being produced
 * @customfunction
 */
function PUNNETT(genotype_parent1, genotype_parent2, genotype_goal) {
  const genotype = new Map();
  const alleles_monohybrid = [];
  const alleles_dihybrid = [];
  const alleles_trihybrid = [];

  // make sure inputs are both monohybrid, dihybrid, or trihybrid
  if ((genotype_parent1.length == genotype_parent2.length) && [2, 4, 6].includes(genotype_parent1.length && genotype_parent2.length))  {
    // calculate monohybrid crosses
    if (genotype_parent1.length == 2) {
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

      console.log(alleles_dihybrid_p1, alleles_dihybrid_p2)

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
      let trihybrid_alleles_parent1 = [];
      let trihybrid_alleles_parent2 = [];
      let alleles_trihybrid_p1 = [];
      let alleles_trihybrid_p2 = [];
      let alleles_trihybrid_combined = [];
      let sorted_trihybrid_alleles = [];

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

    // return probability of goal
    goal_probability = genotype_goal.concat("_probability");

    if (genotype[goal_probability]) {
      return genotype[goal_probability];
    }
    else {
      return 0;
    }
  } else {
    return "INVALID"
  }
}
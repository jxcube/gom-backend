/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gift;

/**
 *
 * @author izul
 */
class Details {

    Age agePrefered;
    Age ageRestriction;
    Gender genderPrefered;
    private int currentMatch = 0;

    private int match(Details target) {
        if (target.agePrefered.equals(ageRestriction)) {
            return 0;
        }
        if (target.agePrefered.equals(agePrefered)) {
            currentMatch++;
        }
        return currentMatch;
    }

}

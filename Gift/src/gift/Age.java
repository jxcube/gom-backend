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
enum Age {
    BELOW_FIVE(0,5),KIDS(0,5),TEEN(0,5),ADULT(0,5),ELDER(0,5);
    int upperLimit,lowerLimit;
    private Age(int x, int y){
        upperLimit = x;
        lowerLimit = y;
    }
}

class Helpers {

    static Roll1DN(N) {
        return Math.floor(Math.random() * N) + 1;
    }



    static SumM1DNDices(M, N) {
        var sum = 0;

        for (var i = 0; i < M; i++) {
            sum += this.Roll1DN(N);
        }
        return sum;
    }

    static GenerateAbilityScore() {
        var initialRolls = [];

        for (var i = 0; i < 4; i++) {
            initialRolls.push(this.Roll1DN(6));
        }

        var minValue = Math.min(...initialRolls);

        for (var j = 0; j < initialRolls.length; j++) {
            if (initialRolls[j] === minValue) {
                initialRolls.splice(j, 1);
                var abilityScore = initialRolls.reduce((a, b) => a + b, 0);

                return abilityScore;
            }
        }
    }
  
    static AddPlusSign(integer) {
        return integer > -1 ? "+" + integer : "" + integer;               
    }
  
    static AbilityModifier(N) {
        return Math.floor((N-10)/2);
    }

}

export default Helpers;
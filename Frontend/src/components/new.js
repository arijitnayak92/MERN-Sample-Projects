function checkValidWordCase(input_array, incoming_word){
        if (!input_array || !input_array.length) return 0;

        function checkAvailability(bi, i, j) {
            if (i < 0 || j < 0 || i > input_array.length - 1 || j > input_array[i].length - 1 || input_array[i][j] !== incoming_word[bi])
                return false;

            if (bi === incoming_word.length - 1) return true;

            return checkAvailability(bi+1, i-1, j) ||
                    checkAvailability(bi+1, i, j-1) ||
                    checkAvailability(bi+1, i+1, j) ||
                    checkAvailability(bi+1, i, j+1);
        }

        for (var i = 0;i < input_array.length;i++) {
            for (var j = 0;j < input_array[i].length;j++) {
                if (checkAvailability(0, i, j))
                    return true;
            }
        }

        return false;
    }

   // Main Input goes here
   // Tested in react server
   let a  = ["ABCE","SFCS","ADEE"];
   // let a  =[];
   // let b ="SEE";
   let b = "ASADEE";
   try {
     if(!a || !b)
     {
       const error = new Error('No Valid Data !');
        throw error;
     }
     let z = checkValidWordCase(a,b)
     console.log(z)
   } catch (e) {
     console.log(e);
   }

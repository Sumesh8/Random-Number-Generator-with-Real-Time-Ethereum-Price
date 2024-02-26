const getPrice = require("../../externalAPI/getEthPrice")
var changeSign = true;

const checkEqual = async (array, numberToCheck) => {
    let index = 0;
    while (index < array.length) {
        if (array[index] === numberToCheck) {
            return (true);
        }
        index++;
    }
    return (false);
}

const generateNumber = async () => {
    const number = await getPrice.getEthPrice();
    let decimalNumber = (number % 1).toFixed(5); // Get 2 decimal places
    decimalNumber = parseFloat(decimalNumber);
    return decimalNumber;
}

const agestmentNumber = async (body, num /*, changeSign = true*/) => {
    if (body.min < 0 && body.max <= 0) {
        if(num > 0){num -= (2 * num);}
        if (num > body.max) {
            num *= 10;
            return await agestmentNumber(body, num);
        }
        else if (num >= body.min && num <= body.max) {
            console.log(num);
            return num;
        }
        else {
            num /= 7.5;
            return await agestmentNumber(body, num);
        }
    }
    else if (body.min >= 0 && body.max >= 0) {
        if (num < body.min) {
            num *= 10;
            return await agestmentNumber(body, num);
        }
        else if (num >= body.min && num <= body.max) {
            return num;
        }
        else {
            num /= 7.5;
            return await agestmentNumber(body, num);
        }
    }
    else {
        if (changeSign) {
            if (0 <= body.max < 5) {
                num *= 5;
            }
            else if (5 <= body.max < 10) {
                num *= 10;
            }
            else if (10 <= body.max < 100) {
                num *= 100;
            }
            else if (100 <= body.max < 1000) {
                num *= 1000;
            }
            else if (1000 <= body.max < 10000) {
                num *= 10000;
            }
            else if (10000 <= body.max < 100000) {
                num *= 100000;
            }
            changeSign = !changeSign;
            return num;
        }
        else {
            if(num > 0){num -= (2 * num);}
            if (0 >= body.min > -5) {
                num *= 5;
            }
            else if (-5 >= body.min > -10) {
                num *= 10;
            }
            else if (-10 >= body.min > -100) {
                num *= 100;
            }
            else if (-100 >= body.min > -1000) {
                num *= 1000;
            }
            else if (-1000 >= body.min > -10000) {
                num *= 10000;
            }
            else if (-10000 >= body.min > -100000) {
                num *= 100000;
            }
            changeSign = !changeSign;
            return num;
        }
    }
}

const generateNumberArray = async (body, numberArray = [], count) => {
    console.log("array1: " + numberArray);
    let decimalNumber = await generateNumber();
    console.log("decimal: " + decimalNumber);
    let finalNumber = await agestmentNumber(body, decimalNumber);
    console.log("final: " + finalNumber);
    if (numberArray.length == body.quantity) {
        console.log("array4: " + numberArray[0]);
        return numberArray;
    }
    else {
        if (!body.is_repeat) {
            if (body.quantity > 1) {
                if (body.quantity == (count - 1)) {
                    return numberArray;
                }
                else {
                    if (numberArray[0]) {
                        //console.log("array2: " + numberArray[count]);
                        let isRepeat = await checkEqual(numberArray, finalNumber);
                        if (!isRepeat) {
                            numberArray[count] = finalNumber;
                            count++;
                            return await generateNumberArray(body, numberArray, count);
                        }
                        else {
                            return await generateNumberArray(body, numberArray, count);
                        }
                    }
                    else {
                        numberArray[count] = finalNumber;
                        console.log("length: " + numberArray.length);
                        console.log("array3: " + numberArray[count]);
                        count++;
                        return await generateNumberArray(body, numberArray, count);
                    }
                }
            } else {
                numberArray[count] = finalNumber;
                return numberArray;
            }
        }
        else {
            if (body.quantity > 1) {
                numberArray[count] = finalNumber;
                count++;
                return await generateNumberArray(body, numberArray, count);
            }
            else {
                numberArray[count] = finalNumber;
                return numberArray;
            }
        }
    }
};



const getNumberArray = async (body) => {
    let numberArray = [];
    // if min vallue is less than max value,
    if (body.min > body.max) {
        return ("Entered maximun value is less than the minimun value");
    }
    //if min value is equal to the max value
    else if (body.min == body.max) {
        if (!body.is_repeat && body.quantity > 1) {
            return ("Can't arange this number with not repeat number condition");
        }
        for (let i = 0; i < body.quantity; i++) {
            numberArray[i] = body.min;
        }
        return (numberArray);
    }
    else {
        const count = 0;
        numberArray = await generateNumberArray(body, [], count);
        return (numberArray);
    }
}


module.exports.getRandomNumbers = async (body) => {
    const numberArray = await getNumberArray(body);
    return (numberArray);
}

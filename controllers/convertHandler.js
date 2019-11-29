/*
*
*
*       Complete the handler logic below
*       
*       
*/

module.exports  = function () {
  this.NO_UNIT="invalid unit";
  this.NO_NUMBER="invalid number";
  this.NO_NUMBER_AND_UNIT = "invalid number and unit";
  this.ERROR_MSG = [
    this.NO_UNIT,
    this.NO_NUMBER,
    this.NO_NUMBER_AND_UNIT
  ]
  
  const units = {
      'gal':'l',
      'lbs':'kg',
      'mi':'km',
      'l':'gal',
      'kg':'lbs',
      'km':'mi'
    };
  
  const unit_spell = {
      'gal':'gallons',
      'lbs':'pounds',
      'mi':'miles',
      'l':'liters',
      'kg':'kilograms',
      'km':'kilometers'
  };
  
  this.getNum = function(input) {
    var result = this.NO_NUMBER;
    
    const regex = /^(?<integer>\d+)?(\.(?<decimal>\d+))?(\/(?<numerator>\d+))?\s*(?<unit>[A-Za-z]+)?$/gm;
    let m = regex.exec(input);
    
    if (m) {
      result = (parseFloat(((m.groups.integer)?m.groups.integer:1)) + parseFloat(((m.groups.decimal)?('0.'+m.groups.decimal):0)))/((m.groups.numerator)?(m.groups.numerator):1);
      console.log("float: "+parseFloat('0.'+m.groups.decimal));
    }
    
    console.log("value to convert: "+result);
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result = this.NO_UNIT;
    
    const regex = /.*?(?<unit>[A-Za-z]+$)/gm;
    let m = regex.exec(input.toLowerCase());
    
    if (m) {
      var aux_unit = m.groups.unit;
      
      if(aux_unit in units) {
        result = aux_unit;
      }
    }
    
    console.log("unit to convert: "+result);
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result = this.NO_UNIT;
    
    if (initUnit in units){
     result = units[initUnit]; 
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    
    return unit_spell[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const Operation = {
      'gal':galToL,
      'lbs':lbsToKg,
      'mi':miToKm,
      'l':(1/galToL),
      'kg':(1/lbsToKg),
      'km':(1/miToKm)
    };
    
    var result = this.NO_NUMBER;
    
    if (initUnit in units) {
      result = Operation[initUnit]*initNum;
      console.log(result+" "+units[initUnit]);
    }    
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    if(initNum==this.NO_NUMBER && initUnit!=this.NO_UNIT ) {
      return this.NO_NUMBER;
    } else if(initNum!=this.NO_NUMBER && initUnit==this.NO_UNIT ) {
      return this.NO_UNIT;
    } else if(initNum==this.NO_NUMBER && initUnit==this.NO_UNIT ) {
      return this.NO_NUMBER_AND_UNIT;
    } 
     
    var initNumStr = this.fixNumber(initNum);
    var returnNumStr = this.fixNumber(returnNum);    
    
    return initNumStr + " " + this.spellOutUnit(initUnit) + " converts to " + returnNumStr + " " + this.spellOutUnit(returnUnit);
  };
  
  this.fixNumber = function(Number) {
    
    var NumStr =  null;
    
    var regex = /(?<int>\d+)(?<decimal>\.\d*?)(?<quit>0*$)/gm;
  
    var m1 = regex.exec(Number.toFixed(5));
    
    if (m1) {
      NumStr = m1.groups.int;
      
      if('decimal' in m1.groups) {
        if(m1.groups.decimal.length > 1) {
          NumStr += m1.groups.decimal;
        }
      }
    }
    
    return NumStr;

  }
  
}



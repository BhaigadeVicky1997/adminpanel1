
import { HttpClient } from '@angular/common/http';

declare var $: any;

export class CommonFunctions {
    constructor(http:HttpClient){}
    static version:any = '1.0.0'; //please change version number on update
    
    

    static getOtp(n) {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

        if (n > max) {
            return this.getOtp(max) + this.getOtp(n - max);
        }

        max = Math.pow(10, n + add);
        var min = max / 10; // Math.pow(10, n) basically
        var number = Math.floor(Math.random() * (max - min + 1)) + min;

        return ("" + number).substring(add);
    }

    static generateFileName() {
        var n = 4;
        //A function to generate 4 digit number to concat with 
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

        if (n > max) {
            return this.getOtp(max) + this.getOtp(n - max);
        }

        max = Math.pow(10, n + add);
        var min = max / 10; // Math.pow(10, n) basically
        var number = Math.floor(Math.random() * (max - min + 1)) + min;

        return "IMG_" + ("" + number).substring(add) + ".JPG";
    }

    static sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    static getCurrentMonth() {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var d = new Date();
        var n = month[d.getMonth()];
        return n;
    }

    static getMonth(date) {
        var month = new Array();
        month[1] = "Jan";
        month[2] = "Feb";
        month[3] = "Mar";
        month[4] = "Apr";
        month[5] = "May";
        month[6] = "Jun";
        month[7] = "Jul";
        month[8] = "Aug";
        month[9] = "Sep";
        month[10] = "Oct";
        month[11] = "Nov";
        month[12] = "Dec";

        /*var d = new Date();
        d.setDate = date;
        console.log(date);*/
        var n = month[parseInt(date, 10)];//d.getMonth()
        return n;
    }

    static getCurrentDate() {
        var today = new Date();
        var dd = today.getDate().toString();

        if (parseInt(dd, 10) < 10) {
            dd = '0' + dd;
        }
        return dd;
    }

    static getCurrentYear() {
        var today = new Date();
        var dd = today.getFullYear().toString();

        return dd;
    }

    static getCurrentTime() {
        var date_format = '12'; /* FORMAT CAN BE 12 hour (12) OR 24 hour (24)*/


        var d = new Date();
        var hour = d.getHours().toString();  /* Returns the hour (from 0-23) */
        var minutes = d.getMinutes().toString();  /* Returns the minutes (from 0-59) */
        var result = hour.toString();
        var ext = '';

        if (date_format == '12') {
            if (parseInt(hour, 10) > 12) {
                ext = 'PM';
                hour = (parseInt(hour) - 12).toString();

                if (parseInt(hour) < 10) {
                    result = "0" + hour;
                } else if (parseInt(hour) == 12) {
                    hour = "00";
                    ext = 'AM';
                }
            }
            else if (parseInt(hour) < 12) {
                result = ((parseInt(hour) < 10) ? "0" + hour : hour);
                ext = 'AM';
            } else if (parseInt(hour) == 12) {
                ext = 'PM';
            }
        }

        if (parseInt(minutes) < 10) {
            minutes = "0" + minutes;
        }

        result = result + ":" + minutes + ' ' + ext;

        return result;
    }

    static removeKeyValue(object, key, value) {
        if (value == undefined)
            return;
        for (var i in object) {
            if (object[i][key] == value) {
                object.splice(i, 1);
            }
        }
    };
    static findKeyValueIndex(object, key, value) {
        if (value == undefined)
            return;
        for (var i in object) {
            if (object[i][key] == value) {
                return i;
            }
        }
    }
    
    static findKeyIndex(object, key) {
        if (key == undefined)
            return;
        for (var i in object) {
            if (object[i][key]) {
                return i;
            }
        }
    }

    static findIndex(object,value) {
        
        if (value == undefined)
            return;
        for (var i in object) {
            //console.log(value);
            if (object[i] == value) {
                return i;
            }
        }
    }
   
    /*
        static myProgressHandler(event) {
            //your code to track upload progress
            var p = Math.floor(event.loaded / event.total * 100);
            document.title = p + '%';
        }
    */

    static formatDate(dateToFormat) {
        //dateToFormat  should be in 2018-11-15 format only else wrong o/p
        //For Formating Moth (Format 01 Jan 1960)
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let app_date = new Date(dateToFormat);
        //console.log(app_date);
        let formattedDate = ((app_date.getDate() < 10) ? ("0" + app_date.getDate()) : app_date.getDate()) + " " + month[app_date.getMonth()] + " " + app_date.getFullYear();
        return formattedDate;
    }

    static formatTime(timeToFormat) {
        //For formatting time (Format 10:10 AM)
        timeToFormat = timeToFormat.split(':');
        var H = + timeToFormat[0];
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? " AM" : " PM";
        var hi = (h < 10) ? "0" + h : h;
        let formattedTime = hi + ":" + timeToFormat[1] + ampm;
        return formattedTime;
    }

    static getLocationfromMap(lat, lon) {
        var localApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=true&key=AIzaSyBlakUKBHDsmTKGfzhOvajEDehx7kSVK_4";
        var mapData;
        $.get({
            url: localApi,
            async: false,
            success: function (data) {
                mapData = data;
                //console.log(mapData.length);
                //console.log(data);
            }
        });
        return mapData;
    }
    
    static getDataFromDragandDrop(dLat,dLng) {
        var localApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + dLat + "," + dLng + "&sensor=true&key=AIzaSyBlakUKBHDsmTKGfzhOvajEDehx7kSVK_4";
        var mapData;
        $.get({
            url: localApi,
            async: false,
            success: function (data) {
                mapData = data;
            }
        });
        return mapData;
    }

    static track(http, encrypted_data,domain) {
        //var domain = InjectorInstance.get<CommonService>(CommonService);
        return http.post(domain+'loginWebService/setUserTrackingDetails', encrypted_data)
            .subscribe(res => {
                //console.log(res);                
                if (res == 'ERROR') {
                    alert('Error');
                } else if (res == 'Invalid_Token') {
                    alert("Invalid Token");
                } else {
                    return "Success";
                }
            });
    }

    static dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePassword(password, toastr,_checkAll = true) {
        var p = password,
            errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters.");
        }
        if (p.search(/[a-z]/i) < 0 && _checkAll) {
            errors.push("Your password must contain at least one letter.");
        }
        if (p.search(/[0-9]/) < 0 && _checkAll) {
            errors.push("Your password must contain at least one digit.");
        }
        if (p.search(/(?=.*[!@#$%^&*])/) < 0 && _checkAll) {
            errors.push("Your password must contain at least one special character.");
        }
        if (errors.length > 0) {
            toastr.error(errors.join("\n"));
            return false;
        }
        return true;
    }

    static validatePincode(pincode) {
        var re = /^(([0-9]{6}))$/;
        return re.test(pincode);
    }

    static validateMobile(mobile) {
        var re = /^(([0-9]{10}))$/;
        return re.test(mobile);
    }

    static validateCharacter(char) {
        var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;///^[a-zA-Z]+$/
        return re.test(char);
    }

    static validateName(char) {
        var re = /^[a-zA-Z- ]+(\s{0,1}[a-zA-Z- ])*$/;
        // /^([a-zA-Z-, ]+\s)*[a-zA-Z]+$/;///^[a-zA-Z]+$/
        return re.test(char);
    }

    static validateWebsite(str) {
        var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        return str.match(re);
    }

    static onlySpecificDigit(e, number = 10) {
        var value = e.target.value.toString();
        if (value.length > (number - 1))
            return false;
    }

    
    static mobileNumber(e, number) {
        var a = e.target.value;
        var b = '';
        for (var i = 0; i < a.length; i++) {
            if (i < number) {
                b += a[i];
            }
            else {
                //alert('Value must not be greater then ' + number + ' digit');
            }
        }
        e.target.value = b;
    }
     
    static trimValueTo(value, number) {
        var a = value;
        var b = '';

        for (var i = 0; i < a.length; i++) {
            if (i < number) {
                b += a[i];
            }
        }
        value = b;
        return value;
    }
    static getBase64(file) {
        //console.log(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            return reader.result;
        };
        reader.onerror = function (error) {
          return error;
        };
        //console.log(reader);
        return reader.result;
     }

     static getBase64WithPromise(file) {
        return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
        })
     }
     
     static numbertofullmonth(value){
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        //console.log(month,value);
        return month[value - 1];
     }

    static convert(str:any){
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/`/g, "&#039;");
        
        return str;
        }

        static decode(str:any){
            str = str.replace("&amp;",/&/g);
            str = str.replace("&gt;",/>/g);
            str = str.replace("&lt;",/</g);
            str = str.replace("&quot;",/"/g);
            str = str.replace("&#039;",/'/g);
            str = str.replace("&#039;",/`/g);
            return str;
            }

            static Test(str:any){
                //console.log(str);
                str = str.toString().replace("&amp;",/&/g);
                str = str.toString().replace("&gt;",/>/g);
                str = str.toString().replace("&lt;",/</g);
                str = str.toString().replace("&quot;",/"/g);
                str = str.toString().replace("&#039;",/'/g);
                str = str.toString().replace("&#039;",/`/g);
                return str;
                }    

    /*static resizeBase64Img(base64, width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        var deferred = $.Deferred();
        context.scale(width,  height);
        context.drawImage(new Image, 0, 0); 
        deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));  
        return deferred.promise();    
    }*/
}

  /*
    decryption(encrypted){
      var today = new Date();
      var dd = today.getDate().toString();
      var mm = (today.getMonth()+1).toString(); //January is 0!
      var yyyy = today.getFullYear().toString();
          
      if(parseInt(dd,10)<10) {
          dd = '0'+dd;
      } 
      if(parseInt(mm,10)<10) {
          mm = '0'+mm;
      }     
      var passPhrase = dd + mm + yyyy;
      var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
      var keySize = 128/32;
      var iterationCount = 100;
      var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
  //-------------------------------------------//
      var key = CryptoJS.PBKDF2(
        passPhrase,
        CryptoJS.enc.Hex.parse(salt),
        { keySize: keySize, iterations: iterationCount });
      //------------------------------------------------//
      var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted)
      });
      console.log(cipherParams);
      var decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: CryptoJS.enc.Hex.parse(iv) });
        decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        console.log('decryption: '+decrypted);
  //-------------------------------------------------//
  
    }

    sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  */


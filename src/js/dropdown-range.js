
$(document).ready(function () {

    function initializeRangeDropdown(dropdownId,counter) {
        let counterObject = [5];
        let maxValue = 5;
        let inputValue = $(dropdownId + " " + ".main-navbar__dropdown-field").attr('value');
        let label = $(dropdownId + " " + ".dropdown-range__field");
        let input = $(dropdownId + " " + ".main-navbar__dropdown-field");
        updateLabelValue(label,inputValue);
        // console.log("Dropdown" + " " + dropdownId + " " + "input value is " + inputValue);
        $(dropdownId + " " + ".dropdown-range__button--left").click(
            function (evt) {
                  rangeButtonClick(evt,'-');
        });
        $(dropdownId + " " + ".dropdown-range__button--right").click(
            function (evt) {
                rangeButtonClick(evt,'+');
            });

        function rangeButtonClick(evt,action){
            let word = 'взрослых';
            console.log(counterObject[0]);
            evt.preventDefault();
            input.focus();
            let counter = counterObject[0];
            if(action==='-'){
                if (counter>1){
                    counterObject[0]--;
                    counter--;
                }
            }

            else if(action === '+' && maxValue < counter){
                counterObject[0]++;
                counter++;
            }

            if(counter===1){
                word = 'взрослый';
            }

            let value = counter + " " + word;

            updateLabelValue(label,value);
            updateInputValue(input,value);
        }
    }



    function updateLabelValue(label,value){
        $(label).html(value);
    }

    function updateInputValue(input,value){
        $(input).attr('value',value);
    }


    initializeRangeDropdown('#dropdown-one');
    let inputValue2 = 1;
    initializeRangeDropdown('#dropdown-two');
    let inputValue3 = 1;
    initializeRangeDropdown('#dropdown-three');

});
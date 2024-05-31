const API_DELAY = 1000;
const MAX_VALUE = 1000000;

function appCalculateCalorie(elemId) {
    const wrapperDiv = document.getElementById('CalculateCalorieDiv');

    const submitButton = wrapperDiv.querySelector('#submitCountingCalorie');
    submitButton.addEventListener('click', function () {
        getResultKcal(wrapperDiv);
    });

    wrapperDiv.querySelector('.slider').addEventListener('input', function () {
        updateDescription(wrapperDiv);
    });
    updateDescription(wrapperDiv);

    addEventListenerForNewRowInputText(wrapperDiv,0);

    let rowCount = 1;
    const button = wrapperDiv.querySelector("#addProductButton");
    button.addEventListener('click', function() {
        addRow(wrapperDiv, rowCount);
        rowCount += 1;
    });
}


function calculateCPFC(wrapperDiv, textField, option, rowCount) {
    const input = wrapperDiv.querySelector(`#weight${rowCount}`);

    input.addEventListener('input', function(event) {
        const parentRow = input.closest('tr');

        const dataTotal = {
            mass: countingTotal('mass', rowCount),
            protein: countingTotal('protein', rowCount),
            fat: countingTotal('fat', rowCount),
            carbohydrates: countingTotal('carbohydrates', rowCount),
            calories: countingTotal('calories', rowCount)
        }

        let value = parseFloat(event.target.value);

        const protein = option.protein;
        const fat = option.fat;
        const carbohydrates = option.carbohydrates;
        const calories = option.calories;

        if (isNaN(value) || value < 0 || value > MAX_VALUE) {
            value = 0;
        }

        parentRow.querySelector('.tdProtein').textContent = (protein * (value / 100)).toFixed(2);
        parentRow.querySelector('.tdFat').textContent = (fat * (value / 100)).toFixed(2);
        parentRow.querySelector('.tdCarbohydrate').textContent = (carbohydrates * (value / 100)).toFixed(2);
        parentRow.querySelector('.tdKcal').textContent = (calories * (value / 100)).toFixed(2);

        const totalMass = wrapperDiv.querySelector("#totalWeight");
        const totalProtein = wrapperDiv.querySelector("#totalProtein");
        const totalFat = wrapperDiv.querySelector("#totalFat");
        const totalCarbohydrates = wrapperDiv.querySelector("#totalCarbohydrate");
        const totalCalories = wrapperDiv.querySelector("#totalKcal");

        for (const key in dataTotal) {
            if (!isNaN(dataTotal[key]) && dataTotal[key] > 0) {
                dataTotal[key] = parseFloat(dataTotal[key]).toFixed(2);
            } else {
                dataTotal[key] = 0.00;
            }

            if (dataTotal[key] > MAX_VALUE) {
                dataTotal[key] = MAX_VALUE;
            }
        }

        totalMass.innerHTML = dataTotal.mass;
        totalProtein.innerHTML = dataTotal.protein;
        totalFat.innerHTML = dataTotal.fat;
        totalCarbohydrates.innerHTML = dataTotal.carbohydrates;
        totalCalories.innerHTML = dataTotal.calories;

        const protein100 = wrapperDiv.querySelector('#protein100');
        const fat100 = wrapperDiv.querySelector('#fat100');
        const carbohydrate100 = wrapperDiv.querySelector('#carbohydrate100');
        const calories100 = wrapperDiv.querySelector('#kcal100');

        if (dataTotal.mass) {
            protein100.innerHTML = (dataTotal.protein * 100 / dataTotal.mass).toFixed(2);
            fat100.innerHTML = (dataTotal.fat * 100 / dataTotal.mass).toFixed(2);
            carbohydrate100.innerHTML = (dataTotal.carbohydrates * 100 / dataTotal.mass).toFixed(2);
            calories100.innerHTML = (dataTotal.calories * 100 / dataTotal.mass).toFixed(2);
        } else {
            protein100.innerHTML = 0;
            fat100.innerHTML = 0;
            carbohydrate100.innerHTML = 0;
            calories100.innerHTML = 0;
        }
    });
}

function countingTotal(properies, rowCount) {
    let sum = 0.;
    let res;
    for (let i = 0; i <= rowCount; ++i) {
        switch (properies) {
            case 'mass':
                res = document.querySelector(`#weight${i}`).value;
                break;
            case 'protein':
                res = document.querySelector(`#protein${i}`).textContent;
                break;
            case 'fat':
                res = document.querySelector(`#fat${i}`).textContent;
                break;
            case 'carbohydrates':
                res = document.querySelector(`#carbohydrate${i}`).textContent;
                break;
            case 'calories':
                res = document.querySelector(`#kcal${i}`).textContent;
                break;
        }
        if (res > 0) {
            sum += parseFloat(res);
        }
    }
    return sum;
}

function addEventListenerForNewRowInputText(wrapperDiv, id) {

    const textField = wrapperDiv.querySelector(`#product${id}`);
    const debouncedApiRequest = debounce(function() {
            apiRequest(textField.value).then(data => {
                    calculateCPFC(wrapperDiv, textField, data, id);
                });
        },
        API_DELAY);
    textField.addEventListener('input', debouncedApiRequest);
}

function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}

function apiRequest(name) {
    return fetch(`http://89.223.127.66:5001/api/products/${name}`).then(
        data => {
            return data.json();
        });
}

function getResultKcal(wrapperDiv) {
    const form = wrapperDiv.querySelector('#calorieForm');
    const ageInput = wrapperDiv.querySelector('#age');
    let manSelect  = wrapperDiv.querySelector("#radio-11");
    let womanSelect  = wrapperDiv.querySelector("#radio-12");
    const weightInput = wrapperDiv.querySelector('#weight');
    const heightInput = wrapperDiv.querySelector('#height');
    const resultDiv = wrapperDiv.querySelector('#result');
    const activityValue = parseInt(wrapperDiv.querySelector('#slider').value);
    const target1 = wrapperDiv.querySelector('#radio-21');
    const target2 = wrapperDiv.querySelector('#radio-22');
    const target3 = wrapperDiv.querySelector('#radio-23');
    const activityWeights = [1.2, 1.375, 1.55, 1.725, 1.9];
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const age = parseInt(ageInput.value);
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const activityWeight = activityWeights[activityValue];
        const gender = {
            isMan: manSelect.checked,
            isWoman: womanSelect.checked
        }
        const target = {
            loseWeight: target1.checked,
            maintainWeigh: target2.checked,
            gainWeight: target3.checked
        }

        const existingResult = wrapperDiv.querySelector('#resultKcal');

        if (existingResult) {
            existingResult.innerHTML = calculateCalorie(gender, age, weight, height, activityWeight, target);
        } else {
            const result = document.createElement('h2');
            result.id = 'resultKcal';
            result.innerHTML = calculateCalorie(gender, age, weight, height, activityWeight, target);

            const newDiv = document.createElement('div');
            newDiv.id = 'divResult';
            newDiv.appendChild(result);

            resultDiv.appendChild(newDiv);
        }
    });
}

function calculateCalorie(gender, age, weight, height, activityWeight, target) {
    let bmr;
    let result;

    if (age < 0 || age > 120 || weight < 10 || weight > 300 || height < 50 || height > 300) {
        result = `Ошибка! Введите корректные данные`;
    }
    else {
        if (gender.isMan) {
            bmr = (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * activityWeight;
        } else {
            bmr = (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * activityWeight;
        }

        if (target.loseWeight) {
            bmr -= 500;
        }
        else if (target.gainWeight) {
            bmr += 500;
        }
        result = `Ваша суточная норма калорий: ${bmr.toFixed(2)} калорий`;
    }

    return result;
}

function updateDescription(wrapperDiv) {
    const slider = wrapperDiv.querySelector("#slider");
    const description = wrapperDiv.querySelector("#description");

    let value = parseInt(slider.value);

    while (description.firstChild) {
        description.removeChild(description.firstChild);
    }

    const activity = {
        name: document.createElement('h4'),
        description: document.createElement('p')
    };

    switch (value) {
        case 0:
            activity.name.innerHTML = 'Очень низкая';
            activity.description.innerHTML = 'Редко выхожу из дома, почти весь день сижу';
            slider.classList = ('slider enabled0');
            break;
        case 1:
            activity.name.innerHTML = 'Низкая';
            activity.description.innerHTML = 'Хожу в магазин или недолго прогуливаюсь';
            slider.classList = ('slider enabled1');
            break;
        case 2:
            activity.name.innerHTML = 'Средняя';
            activity.description.innerHTML = 'Ежедневно гуляю не меньше часа';
            slider.classList = ('slider enabled2');
            break;
        case 3:
            activity.name.innerHTML = 'Высокая';
            activity.description.innerHTML = 'Занимаюсь активными видами спорта/досуга (велосипед, ролики, лыжи, коньки и др.) 2-3 раза в неделю';
            slider.classList = ('slider enabled3');
            break;
        case 4:
            activity.name.innerHTML = 'Очень высокая';
            activity.description.innerHTML = 'Регулярно занимаюсь спортом (бег, гимнастика, тренажерный зал), минимум 5 раз в неделю';
            slider.classList = ('slider enabled4');
            break;
    }

    description.appendChild(activity.name);
    description.appendChild(activity.description);
}

function addRow(wrapperDiv, rowCount) {
    if (rowCount >= 100) {
        return;
    }
    const tableBody = wrapperDiv.querySelector('#tbodyTable');

    const newRow = document.createElement('tr');
    newRow.id = 'tr' + rowCount;

    const cellNumber = document.createElement('td');
    cellNumber.textContent = rowCount + 1;

    const cellProduct = document.createElement('td');
    const cellWrapper = document.createElement('div');
    const productInput = document.createElement('input');
    productInput.id = `product${rowCount}`;
    productInput.type = `text`;
    productInput.setAttribute('list', `datalist${rowCount}`);

    const datalist = document.createElement('datalist');
    datalist.id = `datalist${rowCount}`;

    const cellWeight = document.createElement('td');
    const weightInput = document.createElement('input');
    weightInput.id = `weight${rowCount}`;
    weightInput.type = `number`;
    cellWeight.appendChild(weightInput);

    const cellProtein = document.createElement('td');
    cellProtein.id = `protein${rowCount}`;
    cellProtein.classList = ('tdProtein');
    cellProtein.textContent = '0.00';

    const cellFat = document.createElement('td');
    cellFat.id = `fat${rowCount}`;
    cellFat.classList = ('tdFat');
    cellFat.textContent = '0.00';

    const cellCarbs = document.createElement('td');
    cellCarbs.id = `carbohydrate${rowCount}`;
    cellCarbs.classList = ('tdCarbohydrate');
    cellCarbs.textContent = '0.00';

    const cellCalories = document.createElement('td');
    cellCalories.id = `kcal${rowCount}`;
    cellCalories.classList = ('tdKcal');
    cellCalories.textContent = '0.00';

    newRow.appendChild(cellNumber);
    cellWrapper.appendChild(productInput);
    cellWrapper.appendChild(datalist);
    cellProduct.appendChild(cellWrapper);
    newRow.appendChild(cellProduct);
    newRow.appendChild(cellWeight);
    newRow.appendChild(cellProtein);
    newRow.appendChild(cellFat);
    newRow.appendChild(cellCarbs);
    newRow.appendChild(cellCalories);

    tableBody.appendChild(newRow);
    addEventListenerForNewRowInputText(wrapperDiv, rowCount);

}
appCalculateCalorie("mySite");
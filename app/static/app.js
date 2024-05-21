function appCalculateCalorie(elemId) {
    const divSite = document.getElementById(elemId);
    const wrapperDiv = document.createElement('div');
    wrapperDiv.id = 'CalculateCalorieDiv';

    divSite.appendChild(wrapperDiv);

    addHtmlMarkup(wrapperDiv);

    const submitButton = wrapperDiv.querySelector('#submitCountingCalorie');
    submitButton.addEventListener('click', function () {
        getResultKcal(wrapperDiv);
    });

    wrapperDiv.querySelector('.slider').addEventListener('input', function () {
        updateDescription(wrapperDiv);
    });
    updateDescription(wrapperDiv);

    const options = [
        {
            name: "Яблоко",
            protein: 0.4,
            fats: 0.4,
            carbohydrates: 9.8,
            calories: 47
        },
        {
            name: "Банан",
            protein: 1.5,
            fats: 0.4,
            carbohydrates: 21,
            calories: 96
        },
        {
            name: "Свинина",
            protein: 11.6,
            fats: 49.1,
            carbohydrates: 0,
            calories: 484
        },
        {
            name: "Говядина",
            protein: 18.7,
            fats: 12.6,
            carbohydrates: 0,
            calories: 191
        },
        {
            name: "Курица",
            protein: 20.4,
            fats: 8.6,
            carbohydrates: 0.8,
            calories: 161
        },
        {
            name: "Горбуша",
            protein: 21.2,
            fats: 7.1,
            carbohydrates: 0,
            calories: 151
        },
        {
            name: "Сосиски куриные",
            protein: 10.6,
            fats: 22.1,
            carbohydrates: 3.3,
            calories: 242
        },
        {
            name: "Сосиски свиные",
            protein: 9.2,
            fats: 23.2,
            carbohydrates: 1.7,
            calories: 284
        },
        {
            name: "Грибы белые свежие",
            protein: 3.3,
            fats: 1.5,
            carbohydrates: 2.4,
            calories: 32
        },
        {
            name: "Грибы шампиньоны свежие",
            protein: 4.3,
            fats: 0.9,
            carbohydrates: 1.4,
            calories: 29
        },
        {
            name: "Куриное яйцо",
            protein: 12.7,
            fats: 11.1,
            carbohydrates: 0.6,
            calories: 153
        },
        {
            name: "Масло растительное подсолнечное",
            protein: 0,
            fats: 99.9,
            carbohydrates: 0,
            calories: 898
        },
        {
            name: "Майонез 67%",
            protein: 3.3,
            fats: 67,
            carbohydrates: 2.4,
            calories: 624
        },
        {
            name: "Молоко 2.5%",
            protein: 2.8,
            fats: 2.5,
            carbohydrates: 4.6,
            calories: 53
        },
        {
            name: "Кефир 3.2%",
            protein: 3.2,
            fats: 3.2,
            carbohydrates: 4,
            calories: 51
        },
        {
            name: "Сметана 15%",
            protein: 3,
            fats: 15,
            carbohydrates: 2.9,
            calories: 163
        },
        {
            name: "Творог полужирный",
            protein: 16.5,
            fats: 9,
            carbohydrates: 1.9,
            calories: 156
        },
        {
            name: "Сыр российский",
            protein: 24.1,
            fats: 29.8,
            carbohydrates: 0.4,
            calories: 366
        },
        {
            name: "Крупа овсяная",
            protein: 12.3,
            fats: 6.1,
            carbohydrates: 59.5,
            calories: 342
        },
        {
            name: "Крупа гречневая",
            protein: 11.2,
            fats: 3,
            carbohydrates: 68,
            calories: 350
        },
        {
            name: "Рис белый",
            protein: 7.13,
            fats: 0.66,
            carbohydrates: 78.65,
            calories: 365
        },
        {
            name: "Томаты",
            protein: 0.7,
            fats: 0,
            carbohydrates: 3.1,
            calories: 15
        },
        {
            name: "Картофель вареный",
            protein: 2,
            fats: 0.3,
            carbohydrates: 16.5,
            calories: 80
        },
        {
            name: "Морковь",
            protein: 1.3,
            fats: 0.1,
            carbohydrates: 6.3,
            calories: 29
        },
    ];


    addEventListenerForNewRowInputText(wrapperDiv,0, options);

    let rowCount = 1;
    const button = wrapperDiv.querySelector("#addProductButton");
    button.addEventListener('click', function() {
        addRow(wrapperDiv, rowCount, options);
        rowCount += 1;
    });


    function addHtmlMarkup(div) {
        div.innerHTML = `
        <div class="verticalMenu">
            <ul>
                <li><a href="#calorieCounter">Калькулятор калорий</a></li>
                <li><a href="#productAnalyzer">Анализатор продуктов</a></li>
            </ul>
        </div>
    
        <div id="main">
            <section id="calorieCounter" class="siteCategories">
                <h2>Калькулятор калорий</h2>
                    <p>Рассчитайте сколько калорий, белков, жиров и углеводов вам нужно потреблять ежедневно для поддержания
                        веса, похудения или набора массы.</p>
                    <form id="calorieForm">
                        <div class="commonInfo">
                            <div class="commonInfoWrapper">
                                <div class="formGroup">
                                    <div class="infoHeadingWrapper">
                                        <div class="infoHeadingCircle"></div>
                                        <h4>Общая информация</h4>
                                    </div>
                                    <div class="formGroup1">
                                        <div class="formRadioBtn">
                                            <input id="radio-11" type="radio" name="radio" value="male" checked>
                                            <label for="radio-11">Мужчина</label>
                                        </div>
                                        <div class="formRadioBtn">
                                            <input id="radio-12" type="radio" name="radio" value="women">
                                            <label for="radio-12">Женщина</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="formGroupWrapper">
                                    <div class="formGroup">
                                        <label for="age">Возраст (лет):</label>
                                        <input type="number" id="age" min="1" required>
                                    </div>
                                    <div class="formGroup">
                                        <label for="weight">Вес (кг):</label>
                                        <input type="number" id="weight" min="1" required>
                                    </div>
                                    <div class="formGroup">
                                        <label for="height">Рост (см):</label>
                                        <input type="number" id="height" min="1" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="infoHeadingWrapper">
                            <div class="infoHeadingCircle"></div>
                            <h4>Дневная активность</h4>
                        </div>
                        <div class="formGroup" id="sliderContainer"> 
                            <label for="slider">Выберите значение:</label>
                            <input type="range" class="slider" id="slider" min="0" max="4" step="1">
                            <div id="description"></div>
                        </div>
                        <div class="formGroup" id="yourTarget">
                            <div class="infoHeadingWrapper">
                                <div class="infoHeadingCircle"></div>
                                <h4>Ваша цель</h4>
                            </div>
                            <div class="formRadioBtn">
                                <input id="radio-21" type="radio" name="radio1" value="1" checked>
                                <label for="radio-21">Сбросить вес</label>
                            </div>
    
                            <div class="formRadioBtn">
                                <input id="radio-22" type="radio" name="radio1" value="2">
                                <label for="radio-22">Поддерживать вес</label>
                            </div>
    
                            <div class="formRadioBtn">
                                <input id="radio-23" type="radio" name="radio1" value="3">
                                <label for="radio-23">Набрать вес</label>
                            </div>
                        </div>
                        <button type="submit" id="submitCountingCalorie" class="customButton">Рассчитать</button>
                    </form>
                    <div id="result"></div>
            </section>
    
            <section id="productAnalyzer" class="siteCategories">
                <h2>Анализатор продуктов</h2>
                <table id="apTable">
                    <thead>
                    <tr>
                        <td class="tableHeading">№</td>
                        <td class="tableHeading">Продукт</td>
                        <td class="tableHeading">Вес, гр</td>
                        <td class="tableHeading">Белки, гр</td>
                        <td class="tableHeading">Жиры, гр</td>
                        <td class="tableHeading">Углеводы, гр</td>
                        <td class="tableHeading">Калории, ккал</td>
                    </tr>
                    </thead>
                    <tbody id="tbodyTable">
                    <tr id="tr0">
                        <td>1</td>
                        <td>
                                <input type="text" id="product0" list="datalist0">
                                <datalist id="datalist0">
                                </datalist>
                        </td>
                        <td>
                            <input type="number" id="weight0">
                        </td>
                        <td title="" id="protein0" class="tdProtein">0.00</td>
                        <td title="" id="fat0" class="tdFat">0.00</td>
                        <td title="" id="carbohydrate0" class="tdCarbohydrate">0.00</td>
                        <td title="" id="kcal0" class="tdKcal">0.00</td>
                    </tr>
                </tbody>
                    <tfoot>
                    <tr>
                        <td class="tableFooting"></td>
                        <td class="tableFooting">Итого:</td>
                        <td class="tableFooting" id="totalWeight">0.00</td>
                        <td class="tableFooting" id="totalProtein">0.00</td>
                        <td class="tableFooting" id="totalFat">0.00</td>
                        <td class="tableFooting" id="totalCarbohydrate">0.00</td>
                        <td class="tableFooting" id="totalKcal">0.00</td>
                    </tr>
                    <tr>
                        <td class="tableFooting"></td>
                        <td class="tableFooting">Итого на 100 грамм:</td>
                        <td class="tableFooting" id="weight100">100.00</td>
                        <td class="tableFooting" id="protein100">0.00</td>
                        <td class="tableFooting" id="fat100">0.00</td>
                        <td class="tableFooting" id="carbohydrate100">0.00</td>
                        <td class="tableFooting" id="kcal100">0.00</td>
                    </tr>
                    </tfoot>
                </table>
                <button type="submit" class="customButton" id="addProductButton">Добавить продукт</button>
            </section>
        </div>
    </div>
    `
    }

    function calculateCPFC(wrapperDiv, textField, options, rowCount) {
        const numberInputs = wrapperDiv.querySelectorAll('input[type="number"]');

        numberInputs.forEach(input => {
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

                options.forEach(option => {
                    if (option.name === textField.value) {
                        const protein = option.protein;
                        const fat = option.fats;
                        const carbohydrates = option.carbohydrates;
                        const calories = option.calories;

                        if (isNaN(value) || value < 0 || value > 1000000) {
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

                            if (dataTotal[key] > 1000000) {
                                dataTotal[key] = 1000000;
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
                    }
                })
            });
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

    function addEventListenerForNewRowInputText(wrapperDiv, id, options) {

        const dataList = wrapperDiv.querySelector(`#datalist${id}`);
        const textField = wrapperDiv.querySelector(`#product${id}`);
        textField.addEventListener('input', function() {
            const inputValue = textField.value.toLowerCase();
            clearOptions(dataList);

            const filteredOptions = options.filter(option => option.name.toLowerCase().startsWith(inputValue));

            filteredOptions.forEach(option => addOption(dataList, option.name));
            calculateCPFC(wrapperDiv, textField, options, id);
        });
    }

    function addOption(dataList, optionText) {
        const option = document.createElement('option');
        option.value = optionText;
        dataList.appendChild(option);
    }

    function clearOptions(dataList) {
        dataList.innerHTML = '';
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

    function addRow(wrapperDiv, rowCount, options) {
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
        addEventListenerForNewRowInputText(wrapperDiv, rowCount, options);

    }
}

appCalculateCalorie("mySite");
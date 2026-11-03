// Imports your SCSS stylesheet
import './styles/index.scss';
import carDataset from './car-dataset.json';

//I kept getting confuesed about the categories, so I learned I can run this to find them and display them.
// console.log(carDataset[0]);

//I'm testing if the import is working correctly
// console.log(carDataset.length);


class CarFinder {
    constructor(cars){
        this.cars = cars;
    }
}

const finder = new CarFinder(carDataset);
// console.log(finder.cars.length)

const years = new Set();

carDataset.forEach((car) =>{
    years.add(car.year);

});

//I'm learning that you can't put a Set in numerical order, so I had to transform it into an array first, then the next thing I need to do is apply the method of yearList.sort();
const yearList = Array.from(years);

//So, here's the sorting part. When I run console.log(year); though, it's not pulling from the correct place for the year order to make sense because the variable changed, so I'll need to console.log(yearLilst); to point to the right thing.
//Edit: I learned that my thinking was a little off here. The Set didn't change, the Array.from(years) made a new separate array that's a copy of what was in the Set. After that, the yearList.sort(); sorted the previously made 'copy'. It goes from 'Set' which is in original messy order, and then yearList is the array and now sorted.
yearList.sort();

//Here is what I was mentioning above.
// console.log(yearList);

//Now that it's all sorted, I have to have JavaScript search and find within my html document the element with the id 'year' so I can put the years into it.
const yearSelect = document.querySelector('#year');

//Applying a .forEach to the sorted array (I had to learn this the hard way because I was originally doing .forEach to yearSelect, but that's the dropdown, not a list of years).
yearList.forEach((year) =>{
    const option = document.createElement('option');//I had to make a blank option.
    option.textContent = year;//This then writes the year within the blank option.
    yearSelect.appendChild(option);//This then puts it inside the year dropdown.
    

});

//Same as above with yearSelect, I have to make JavaScript search and find within my html document the element with the id 'make'.
const makeSelect = document.querySelector('#make');

const modelSelect = document.querySelector('#model');

yearSelect.addEventListener('change', () => {
        // console.log(yearSelect.value);
        makeSelect.disabled = false;
        makeSelect.innerHTML = '<option>Vehicle Make</option>';//I was having an issue where when I switched years after already selecting a year and a make where it would stack the previous make within the make dropdown instead of getting rid of it. So, I had to learn that makeSelect.innerHTML takes what was in the dropdown and dumps it out after choosing another year in the year dropdown. It then puts the "Vehicle Make" placeholder BACK after dumping everything out. This was a wild ride lesson.
        //setting modelSelect.disabled = true locks 'Model' (the opposite of the Make listener below, which unlocks it). I needed this because when I switched years, Model stayed unlocked with the old models still in it. 
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option>Vehicle Model</option>';
        const yearCarsAfterFilter = carDataset.filter((car) => car.year == yearSelect.value);
        // console.log(yearCarsAfterFilter.length);

        //This code below sits inside the event listener, and in this location, because I want it to trigger right after the year is filted.
        const make = new Set();
        
        yearCarsAfterFilter.forEach((car) => {
            make.add(car.Manufacturer);
        });

        const makeList = Array.from(make);
        makeList.sort(); //I'm noticing that the makes are sorted alphabetically first by capital letters the alphabetizing the lowercase words after that. That's weird...

    makeList.forEach((make) => {
        const option = document.createElement('option');
        option.textContent = make;
        makeSelect.appendChild(option);
        });
    
        // console.log(makeList);


    });

makeSelect.addEventListener('change', () => {
    // console.log(makeSelect.value);
    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option>Vehicle Model</option>';
    const modelAfterFilter = carDataset.filter((car) => car.Manufacturer == makeSelect.value && car.year == yearSelect.value); //This one was tough to conceptualize. It finally clicked for me that without the && car.year == yearSelect.value, it was pulling literally every, say 'Ford', I selected rather than the make within the chosen year as well.
    // console.log(modelAfterFilter);

    const models = new Set();

    modelAfterFilter.forEach((car) => {
        models.add(car.model);
    });
    // console.log(models);

    const modelList = Array.from(models);
    modelList.sort();

modelList.forEach((model) => {
        const option = document.createElement('option');
        option.textContent = model;
        modelSelect.appendChild(option);
    });



});

//This was a huge realization. So, filter goes through goes through the whole array and find goes through the cars and stops at the first match. This gives back just one car not the entire list. This is just all of the things needed to narrow it down and down to what you are actually looking for.
modelSelect.addEventListener('change', () => {
    const selectedCar = carDataset.find((car) => car.year == yearSelect.value && car.Manufacturer == makeSelect.value && car.model == modelSelect.value);
    console.log(selectedCar);

});
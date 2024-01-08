// get data from by api
const loadData = async(brand='iphone', limit) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
    const data = await response.json();
    getData(data.data, limit);
}













const getData = (phones, limit) => {
    // container
    const phonesContainer = document.getElementById('phones-container');
    // clear previous data whene searching
    phonesContainer.innerHTML = '';

    // set limit of data
    const showAllButton = document.getElementById('show-all-button');
    if (limit && phones.length > limit) {
        phones = phones.slice(0, limit);
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }
    

    // not found condition
    const notFound = document.getElementById('not-found-text'); // take element outside cause else need the element
    const resultCountContainer = document.getElementById('result-count-text');
    if(phones.length === 0) {
        // if not found
        notFound.classList.remove('hidden');

        // result count
        resultCountContainer.innerText = `Found ${phones.length} items`;
        loader(false);
    
    } else {
        // if found result
        notFound.classList.add('hidden');

        // result count
        resultCountContainer.innerText = `Found ${phones.length} items`;
        
    }

    // loop on phones
    phones.forEach(phone => {
        
        // create element
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card', 'card-compact', 'w-full', 'pt-3', 'bg-white', 'text-black','shadow-xl');
        phoneDiv.innerHTML = `
            <figure><img class="w-96" src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Brand: ${phone.brand}</p>
            <div class="card-actions justify-end">
                <label for="my-modal-5" onclick="loadDetails('${phone.slug}')" class="btn">Details</label>
            </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);

        // loading condition
        loader(false);
    })
}














/// search function
const search = (limit) => {
    // loading condition
    loader(true);

    // get value and pass as argument of loadData
    const fieldValue = document.getElementById('search-field').value;
    loadData(fieldValue, limit);
}

// search phone (show limited items) - handled in search button
const searchPhoneByBrand = () => {
    search(6); // 6 is item showing limit
}

// search by enter key press
document.getElementById('search-field').addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        search(6); // 6 is item showing limit
    }
})


// show all items - handled in show all button
const showAll = () => {
    search(); // no showing limit for show all
}

















// loader
const loader = isloading => {
    const loaderElement = document.getElementById('loader');

    if (isloading === true) {
        // if loading (isLoading === true)
        loaderElement.classList.remove('hidden');
    } else {
        // if loading end (isLoading === false)
        loaderElement.classList.add('hidden');
    }
}










// load details
const loadDetails = async(slug) => {
   const response2 = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
   const data = await response2.json();
   showDetails(data.data);
}




// show details in modals elements
const showDetails = (details) => {
    
    const phoneName = document.getElementById('phone-name');
    const phoneBrand = document.getElementById('phone-brand');
    const phoneRelease = document.getElementById('phone-release');
    const phoneThumb = document.getElementById('phone-thumb');
    phoneName.innerText = details.name;
    phoneBrand.innerText = 'Origin: ' +  details.brand;
    phoneRelease.innerText = details.releaseDate;
    phoneThumb.setAttribute('src', details.image);



    // features
    const phoneFeatures = document.getElementById('phone-features');
    phoneFeatures.innerHTML = `
        <h3 class="text-xl mb-5">Features</h3>
        <p>Storage - ${details.mainFeatures.storage}</p>
        <hr class="my-2">
        <p>Display - ${details.mainFeatures.displaySize}</p>
        <hr class="my-2">
        <p>Chipset - ${details.mainFeatures.chipSet}</p>
        <hr class="my-2">
        <p>Memmory - ${details.mainFeatures.memmory}</p>
        <hr class="my-2">
        <p>Sensors - ${details.mainFeatures.sensors}</p>
        <hr class="my-2">
    `;

}





// called here to pass default parameter value 
loadData();





const password = "letmeseeyouguessthispassword"
const length = password.length;
const elite = 50;
const random = 50;
const numberOfChildren = 5;
const totalPopulation= 500;
const mutation = 5;
const numberOfGenerations = 100;


function fitness(individual) {
	if(individual.length != password.length){
		return "Incompatible"
	}
	var score = 0;
	for(i = 0; i< individual.length; i++){
		if(individual[i] == password[i]){
			score++;
		}
	}

	return (score/individual.length) * 100
}

function generateIndividuals(){
	var alphabets = "qwertyuioplkjhgfdsazxcvbnm";
	var word = '';
	for(i = 0; i< length; i++){
		word += alphabets[Math.floor(Math.random() * 26)]
	}
	return word;
}

function generatePopulation(size){
	let population = [];
	for(p = 0; p < size; p++){
		population.push(generateIndividuals());
	}
	console.log("Initial Population " , population)
	return population;
}

function elitePopulation(population){
	let elitePopulationHash = {}
	population.map(function(individual){
		elitePopulationHash[individual] = fitness(individual)
		return elitePopulationHash;
	})
	//console.log('Elite HASH: ', elitePopulationHash);
	elitePop = Object.keys(elitePopulationHash).sort(function(a,b){return elitePopulationHash[b]-elitePopulationHash[a]})
	//console.log("Best in this Generation: ", elitePop[0]);
	return elitePop

}

function computeBreeders(elitePopulation){
	let nextGen = []
	for(j = elite + random; j> 0; j--){
		var index = Math.floor(Math.random() * elitePopulation.length * 0.55);
		nextGen.push(elitePopulation[index]);
	}
	//console.log('NEXTGEN ', nextGen)
	return nextGen;
}

function crossingOver(m , n){
	var x = "";
	var y = "";
	for(k=0; k< m.length; k++) {
		if(Math.random() < 0.60){
			x += n[k]
			y += m[k]
		}else{
			x += m[k]
			y += n[k]
		}
	}
	return [x, y];
}

function createChildren(breeders){
	let nextGenPopulation = [];
	for(z = 0; z< breeders.length; z++){
		for(a = 0; a< numberOfChildren; a++){
			nextGenPopulation.push(...crossingOver(breeders[z], breeders[Math.floor(Math.random()*breeders.length)]));
		}
	}
	return nextGenPopulation;
}

function mutate(population){
	var newPop = [];
	population.map((individual) => {
		if(Math.random() < mutation/100	){
			newPop.push(mutateIndividual(individual));
		}else{
			newPop.push(individual);
		}
	})
	return newPop;
}

function mutateIndividual(individual){
	var mutInd = ""
	let alphabets = "abcdefghijklmnopqrstuvwxyz";
	for(h=0; h< individual.length; h++){
		if(Math.random() > 0.2){
			mutInd += alphabets[Math.floor(Math.random() * 26)]
		}else{
			mutInd += individual[h]
		}
	}
	return mutInd;
}

function nextGen(currentGen){
	elitePop = elitePopulation(currentGen);
	breeders = computeBreeders(elitePop);
	nextGeneration = createChildren(breeders);
	return mutate(nextGeneration);
}

var current = generatePopulation(totalPopulation)
for(s = 0; s< numberOfGenerations; s++){
	newGeneration = nextGen(current);
	current = newGeneration;
	if(s == numberOfGenerations - 1){
		console.log("GA ran for ", s , " generations: ", elitePopulation(current)[0])
	}

}

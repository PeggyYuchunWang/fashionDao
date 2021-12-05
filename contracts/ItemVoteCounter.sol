pragma solidity >=0.5.0 <0.9.0;



contract Vote {


    mapping(string => bool) public item_to_exists;
    mapping(string => uint) public item_to_votes;


    constructor() {

        item_to_votes["1"] = 0;
        item_to_exists["1"] = true;

        item_to_votes["2"] = 0;
        item_to_exists["2"] = true;

        item_to_votes["3"] = 0;
        item_to_exists["3"] = true;

        item_to_votes["4"] = 0;
        item_to_exists["4"] = true;
    }

    function placeVote(string memory key) public {
        if (item_to_exists[key] == false) {
            revert("An item with that key does not exist.");
        }
        item_to_votes[key] = item_to_votes[key] + 1;
    }

    function addImage(string memory key) public {
        if (item_to_exists[key] == true) {
            revert("An item with that key already exists.");
        }
        item_to_exists[key] = true; 
        item_to_votes[key] = 0;
    }

    function resetImage(string memory key) public {
        if (item_to_exists[key] == false) {
            revert("An item with that key does not exist.");
        }
        item_to_votes[key] = 0;
    }

    function removeImage(string memory key) public {
        if (item_to_exists[key] == false) {
            revert("An item with that key does not exist.");
        }
        item_to_votes[key] = 0;
        item_to_exists[key] = false;
    }

    function getVotes(string memory key) public view returns(uint){
        if (item_to_exists[key] == false) {
            revert("An item with that key does not exist.");
        }
        return item_to_votes[key];
    }
}
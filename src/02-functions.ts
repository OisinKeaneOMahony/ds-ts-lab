import {Friend, Colleague, EmailContact } from './myTypes'

import { friends, colleagues } from "./01-basics";

function older(f: Friend) {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder(friendsArray : Friend[]) {
    return friendsArray.map(friend => older(friend));
}

function highestExtension(cs: Colleague[]) { // Inferred retun type
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}

function addColleague(cs : Colleague[], name : string, department : string, email : string) {
  const highest = highestExtension(cs).contact.extension;
  const newColleague: Colleague = {
      name,
      department,
      contact: {
          email,
          extension: highest + 1
      }
  };
  cs.push(newColleague);
}

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}

function findFriends(
  friendsArray: Friend[],
  callback: (friend: Friend) => boolean): string[] {
  return friendsArray.filter(callback).map(friend => friend.name);
  }

  function addInterest(friend: Friend, interest: string): string[] {
    if (!friend.interests) {
      friend.interests = [];
    }
    friend.interests.push(interest);
    return friend.interests;
  }

console.log(older(friends[0]))
console.log(allOlder(friends));
console.log(highestExtension(colleagues.current));
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension), 3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length)));
console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));
console.log(addInterest(friends[1], 'Politics'))
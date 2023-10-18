import {Friend, Colleague } from './myTypes'

import { friends, colleagues } from "./01-basics";

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder(friendsArray: Friend[]): string[] {
    return friendsArray.map(friend => older(friend));
}

// Changed to return number
function highestExtension(cs: Colleague[]): number {
  if(cs.length === 0) {
      return 0;
  }

  const result = cs.sort((c1, c2) => c1.contact.extension - c2.contact.extension);
  return result[cs.length - 1].contact.extension;
}

function addColleague(cs: Colleague[], name: string, department: string, email: string): void {
  const highest = highestExtension(cs);
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

console.log(older(friends[0]))
console.log(allOlder(friends));
console.log(highestExtension(colleagues.current));
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

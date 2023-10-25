import { friends, colleagues } from "./01-basics";
import { Friend, Colleague, SecureFriendContact, FriendPartial } from "./myTypes";

type EventPass = {
    name: string;
    department: string;
    passcode: number;
}

function updateFriend(friend: Friend, updates: FriendPartial ) : Friend {
  return { ...friend, ...updates}
}

console.log(updateFriend(friends[0], {
  phone: '08712345',
  dob: new Date("1998-10-22")
}))

function secureFindFriends(
    friends: Friend[],
    criteria: (f: Friend) => boolean
  ): SecureFriendContact[] {
    const matches = friends.filter(criteria);
    return matches.map((f) => {
      const secure: SecureFriendContact = {
        name: f.name,
        phone: f.phone,
      };
      return secure;
    });
  }
  let result = secureFindFriends(
      friends,
      (f: Friend) => f.age < 30
  )

  function generateEventPass(colleague: Colleague): EventPass {
    const passCode = Math.round(Math.random() * (1000 - 1) + 1);
    return {
      name: colleague.name,
      department: colleague.department,
      passcode: passCode,
    };
  }

  type FriendColleagueIntersection = {
    name: string;
    age: number;
    contact: {
        email: string;
        extension: number;
    };
  }

  function intersection(
    friends: Friend[],
    colleagues: Colleague[]
  ): FriendColleagueIntersection[] {
    let result: FriendColleagueIntersection[] = [];

    friends.reduce((res, friend) => {
      const colleague = colleagues.find((col) => col.name === friend.name);
      if (colleague) {
        // Colleague is also a Friend
        const combined: FriendColleagueIntersection = {
            name: friend.name,
            age: friend.age,
            contact: {
                email: colleague.contact.email,
                extension: colleague.contact.extension
            }
        };
      }
      return res;
    }, result);
    return result;
  }
  
  console.log(intersection(friends, colleagues.current));
  console.log(generateEventPass(colleagues.current[0]));
  console.log(result)
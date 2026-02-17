# JavaScript Basic Concepts Q&A

---

#### 1) What is the difference between `null` and `undefined`?

**Ans:** undefined মানে হলো একটি ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু কোনো মান অ্যাসাইন করা হয়নি।  
অন্যদিকে, null মানে হলো কোনো মান নেই যা ইচ্ছাকৃতভাবে সেট করা হয়েছে।  

---

#### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

**Ans:** map() এবং forEach() দুইটাই লুপের জন্য ব্যবহৃত হয়, কিন্তু পার্থক্য হলো:  
map() নতুন array return করে। forEach() কোনো value return করে না।  

---

#### 3) What is the difference between `==` and `===`?

**Ans:** == এবং === এর পার্থক্য হলো: == শুধুমাত্র value চেক করে, type ignore করে। === value এবং type দুইটাই চেক করে।  

---

#### 4) What is the significance of `async`/`await` in fetching API data?

**Ans:** async এবং await এর গুরুত্ব হলো API থেকে ডেটা fetch করার সময় asynchronous কাজ সহজভাবে handle করা।  

---

#### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**Ans:**  
Global → সব জায়গা থেকে access  
Function → শুধু function এর ভিতরে access  
Block → শুধু block এর ভিতরে access (let, const)  

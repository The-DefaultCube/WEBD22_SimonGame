<script type="module">
			// Import the functions you need from the SDKs you need
			import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
			const firebaseConfig = {
				apiKey: "AIzaSyARMYNhInt_V6dYRltgMlwDhXJbck4H3WU",
				authDomain: "fir-crud-f7e38.firebaseapp.com",
				projectId: "fir-crud-f7e38",
				storageBucket: "fir-crud-f7e38.appspot.com",
				messagingSenderId: "1040735585534",
				appId: "1:1040735585534:web:d1d168f22b9d71b525d1af",
			};
			// Initialize Firebase
			const app = initializeApp(firebaseConfig);
			// Initialize Realtime Database and get a reference to the service
			import {
				getDatabase,
				ref,
				set,
				get,
				child,
				push,
				orderByChild,
				query
			} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
			const db = getDatabase(app);
			//add data
			const obj1 = {
				name: "m@nish",
				score: 369,
			};
			const obj2 = {
				name: "rahul",
				score: 123,
			};
			const obj3 = {
				name: "rohan",
				score: 789,
			};
			// set(ref(db, "scores/"+obj1.name), obj1);
			// set(ref(db, "scores/"+obj2.name), obj2);
			// set(ref(db, "scores/"+obj3.name), obj3);
			const postListRef = ref(db, "posts");
			const newPostRef = push(postListRef);
			// set(newPostRef, obj1);
			// set(newPostRef, obj2);
			// set(newPostRef, obj3);

			// get data
			get(child(ref(db), "posts")).then((snapshot) => {
				const myData = (snapshot.val());
				// console.log(myData);
				let array = [];
				for (const data in myData) {
					// console.log(myData[data]);
					array.push(myData[data]);
				}
				// array.sort((obj1, obj2)=>{
				// 	if(obj1.score > obj.score) return 1;
				// 	else return -1;
				// })
				array.sort((a, b) => (a.score < b.score) ? 1 : -1)
				console.log(array);

			});

			// var playersRef =ref(db, "posts");

			// playersRef.orderByChild("score").on("child_added", function(data) {
			//    console.log(data.val());
			// });
			// .then((snap)=>{

			// 	console.log(snap.val());
			// })
		</script>
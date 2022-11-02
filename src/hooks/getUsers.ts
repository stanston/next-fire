import { useState, useRef, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "lib/firebase";

export const useGetUsers = () => {
  const [users, setUsers] = useState<any>([]);

  const getUsers = () => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      setUsers([]);
      querySnapshot.docs.map((doc) => {
        // users.push(doc.data());
        setUsers((prev: []) => [...prev, doc.data()]);
      });
      // console.log(users);
    });
  };

  const didLogRef = useRef(false);
  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;

      getUsers();
    }
  });

  return {
    users,
  };
};

"use client";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/src/firebase/fierbase";
import { useState, useEffect } from "react";

export default function VoteBtn() {
  const [votes, setVotes] = useState<number | null>(null);
  const [userIP, setUserIP] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const docRef = doc(db, "votes", "pw7Ctr814WHXqGGU5LfL");

  // Function to fetch user's IP
  const getIP = async () => {
    try {
      const res = await fetch("https://api64.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  };

  // Fetch votes and check if the user has already voted
  const fetchVotes = async () => {
    const ip = await getIP();
    if (!ip) return;

    setUserIP(ip);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setVotes(data.votes);

      // Check if user's IP is already in the database
      if (data.IPs && data.IPs.includes(ip)) {
        setHasVoted(true);
      }
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  // Voting function with duplicate prevention
  const vote = async () => {
    if (hasVoted || !userIP) {
      alert("You have already voted!");
      return;
    }

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;

    const currentVotes = docSnap.data().votes || 0;

    await updateDoc(docRef, {
      IPs: arrayUnion(userIP), // Prevents duplicate votes
      votes: currentVotes + 1,
    });

    setVotes(currentVotes + 1);
    setHasVoted(true);
  };

  return (
    <div>
      <button onClick={vote} disabled={hasVoted}>
        {hasVoted ? "Already Voted" : "Vote"}
      </button>
      {votes !== null && <p>Votes: {votes}</p>}
    </div>
  );
}

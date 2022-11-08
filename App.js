import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './styles';
//import joke, punchline, and another component
import Joke from './components/Joke';
import Punchline from './components/Punchline';
import Another from './components/Another';


export default function App() {
  //Create state to hold jokes
  const [ jokeList, setJokeList ] = useState();
  //Create state to hold last joke index
  const [ currentJokeIndex, setCurrentJokeIndex ] = useState(0);
  //Create function to get another
  const getNextJoke = () => {
    if (currentJokeIndex < jokeList.length - 1) {
      setCurrentJokeIndex(currentJokeIndex + 1)
    } else {
      setCurrentJokeIndex(0)
    }
  }
      
  //useEffect to get all jokes 
  useEffect(() => {
    fetch('https://api.sampleapis.com/jokes/goodJokes')
    .then(result => result.json())
    .then(setJokeList)
    .catch(alert)
  }, [])
  return (
    <View style={styles.container}>
      {jokeList
      ? <> 
      <Joke joke={jokeList[currentJokeIndex].setup}/>
      <Punchline punchline={jokeList[currentJokeIndex].punchline} />
      </>
      :null
      }
      <Another getNextJoke={getNextJoke} />
      <StatusBar style="auto" />
    </View>
  );
}


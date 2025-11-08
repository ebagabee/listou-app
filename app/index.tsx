import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as shoppingListDB from "../database/shoppingList";

export default function Index() {
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const viewed = await shoppingListDB.getPreference(db, 'welcome_screen_viewed');
        setHasSeenWelcome(viewed === 'true');
      } catch (e) {
        console.warn('Erro ao verificar onboarding:', e);
        setHasSeenWelcome(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkOnboarding();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Redirect href={hasSeenWelcome ? "/homePage" : "/welcomePage"} />
  );
}
export interface MCUMovie {
  title: string;
  poster_url: string;
  release_date: string;
  overview: string;
  days_until: number;
}

export interface MCUResponse extends MCUMovie {
  id: number;
  type: string;
  following_production?: MCUMovie & { id: number; type: string };
}

export const MCU_API_URL = 'https://www.whenisthenextmcufilm.com/api';

export const getNextMCUMovie = async (): Promise<MCUResponse | null> => {
  try {
    const res = await fetch(MCU_API_URL);
    if (!res.ok) {
      console.error(`Failed to fetch movie data: HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    return null;
  }
};

/** Placeholder data (no API) for demo mode, toggled by tapping the app title five times. */
export const getPlaceholderMovie = async (): Promise<MCUResponse | null> => {
  await new Promise(r => setTimeout(r, 600));
  return {
    id: 1,
    type: 'movie',
    title: 'Shadows of the Sock Drawer',
    poster_url: 'https://picsum.photos/seed/sockdrawer/400/600',
    release_date: 'June 15, 2026',
    days_until: 127,
    overview:
      'In a world where every washing machine hides a portal to the unknown, one man must find his missing argyle. A gripping tale of loss, lint, and the socks that never came back. Based on a true story. (Nobody asked.)',
    following_production: {
      id: 2,
      type: 'movie',
      title: 'Gary 2: The Tax Returns',
      poster_url: 'https://picsum.photos/seed/gary2/400/600',
      release_date: 'December 1, 2026',
      days_until: 296,
      overview:
        "Gary is back. The IRS is back. This time it's personal. The long-awaited sequel to the 2024 hit 'Gary: The Movie' explores what happens when a man named Gary does his taxes. Spoiler: it's mostly spreadsheets.",
    },
  };
};

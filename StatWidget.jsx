
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";

const stats = {
  Physical: ["Stamina", "Kracht", "Snelheid", "Flexibiliteit", "VO2 Max"],
  Mental: ["Focus", "Discipline", "Mentale Weerstand"],
  Spiritual: ["Rust (Sakīnah)", "Tijdbeheer"]
};

const levels = [10, 30, 50, 70, 90, 99];

const statMilestones = {
  Stamina: [
    "1.000 stappen max",
    "5.000 stappen + 15 min wandelen",
    "10k stappen + 30 min wandelen",
    "20k stappen + 1 uur doorwandelen",
    "Half-marathon wandelen/joggen",
    "Ultrahike: 50 km in 1 dag"
  ],
  Kracht: [
    "2 push-ups, 5 squats",
    "10 push-ups, 20 squats",
    "20 push-ups, 30 squats, 1 min plank",
    "40 push-ups, 3 pull-ups",
    "80 push-ups, 10 pull-ups",
    "100 push-ups, 10 pull-ups, dips met gewicht"
  ],
  Snelheid: [
    "100m in 18 sec",
    "100m in 15 sec",
    "100m in 13 sec",
    "100m in 11.8 sec",
    "100m in 10.5 sec",
    "100m in 9.8 sec (wereldniveau)"
  ],
  Flexibiliteit: [
    "Kan niet bij tenen",
    "Tenen raken met moeite",
    "Tenen + schoudermobiliteit gemiddeld",
    "Palmen op vloer + diepe squat",
    "Volledige lotus + bridge hold",
    "Split + schouder dislocates zonder pijn"
  ],
  "VO2 Max": [
    "Traplopen is zwaar",
    "2 km wandelen",
    "5 km wandelen zonder vermoeidheid",
    "5 km joggen normaal tempo",
    "10 km run zonder pauze",
    "Marathon lopen (elite longfunctie)"
  ],
  Focus: [
    "10 min zonder afleiding",
    "30 min Pomodoro",
    "90 min deep work",
    "2x 90 min per dag",
    "3+ uur per dag",
    "5+ uur focus, geen dopamine dips"
  ],
  Discipline: [
    "Routine 2 dagen/wk",
    "5 dagen gewoontes",
    "Dagelijks moeilijke taak",
    "90% weekplan volgen",
    "100% inzet altijd",
    "12 weken geen skip"
  ],
  "Mentale Weerstand": [
    "Kritiek = terugval",
    "1 dag zonder social media",
    "Stress zonder impulsief gedrag",
    "Koude douche + vasten",
    "3 uur ongemak kalm",
    "10 dagen stilte/challenge"
  ],
  "Rust (Sakīnah)": [
    "1x rust per dag",
    "5 min stilte zonder onrust",
    "Rust na salāh 2x per dag",
    "Kalm in conflictsituaties",
    "Diepe dhikr/Qur’an = rust",
    "Onverstoorbare rust overal"
  ],
  Tijdbeheer: [
    "1 dag gepland/week",
    "Dagelijks planning + 70% volgen",
    "Wekelijkse reflectie",
    "Per uur plannen + buffer",
    "Time-blocking master",
    "16 uur benut, totale controle"
  ]
};

export default function StatWidget() {
  const [selectedStat, setSelectedStat] = useState(null);
  const [xp, setXp] = useState({});

  const getCurrentLevel = (stat) => {
    const milestones = statMilestones[stat];
    const currentXp = xp[stat] || 0;
    const index = Math.min(Math.floor(currentXp / 100), milestones.length - 1);
    return { level: levels[index], milestone: milestones[index], progress: (currentXp % 100) };
  };

  const addXp = (stat, amount) => {
    setXp((prev) => ({ ...prev, [stat]: (prev[stat] || 0) + amount }));
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold text-center text-white">ACE: Stat Tracker Widget</h1>

      {Object.entries(stats).map(([category, statList]) => (
        <Card key={category} className="bg-zinc-900 text-white">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <div className="grid grid-cols-2 gap-2">
              {statList.map((stat) => (
                <Button
                  key={stat}
                  onClick={() => setSelectedStat(stat)}
                  variant={selectedStat === stat ? "default" : "outline"}
                >
                  {stat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {selectedStat && (
        <Card className="bg-zinc-800 text-white">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">{selectedStat} Progress</h3>
            <div className="mb-2">
              <Progress value={getCurrentLevel(selectedStat).progress} />
              <p className="text-sm mt-1">
                Level {getCurrentLevel(selectedStat).level}: {getCurrentLevel(selectedStat).milestone}
              </p>
            </div>
            <Button onClick={() => addXp(selectedStat, 10)} className="mt-2">
              +10 XP
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Heart, Barbell, Info, FirstAid } from '@phosphor-icons/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PushUpAnimation } from '@/components/PushUpAnimation'

export function InfoView() {
  return (
    <div className="min-h-screen p-4 md:p-8 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-display font-bold text-foreground">Liegestütz-Wissen</h1>
          <p className="text-muted-foreground">Alles was du über Liegestütze wissen musst</p>
        </div>

        <Tabs defaultValue="variants" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="variants" className="gap-2">
              <Barbell size={20} weight="bold" />
              <span className="hidden sm:inline">Varianten</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-2">
              <Heart size={20} weight="bold" />
              <span className="hidden sm:inline">Gesundheit</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Info size={20} weight="bold" />
              <span className="hidden sm:inline">Tipps</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="variants" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Barbell size={24} weight="bold" className="text-primary" />
                  Liegestütz-Varianten
                </CardTitle>
                <CardDescription>
                  Verschiedene Varianten für unterschiedliche Muskelgruppen und Schwierigkeitsgrade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="regular">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Regular Push-Up</span>
                        <Badge variant="secondary">Anfänger</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="regular" />
                      </div>
                      <p>
                        <strong className="text-foreground">Die klassische Liegestütze</strong> - perfekt für Anfänger und als Basis-Übung.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Hände schulterbreit aufsetzen</li>
                          <li>Körper bildet eine gerade Linie</li>
                          <li>Ellbogen ca. 45° vom Körper abspreizen</li>
                          <li>Brust bis kurz über dem Boden absenken</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Brust, Trizeps, vordere Schulter, Core</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="wide">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Wide Push-Up</span>
                        <Badge variant="secondary">Anfänger</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="wide" />
                      </div>
                      <p>
                        <strong className="text-foreground">Breite Liegestütze</strong> - stärker Fokus auf die äußere Brust.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Hände deutlich breiter als schulterbreit</li>
                          <li>Ellbogen stärker nach außen</li>
                          <li>Kürzerer Bewegungsradius</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Äußere Brust, vordere Schulter</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="close">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Close Push-Up</span>
                        <Badge>Mittel</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="close" />
                      </div>
                      <p>
                        <strong className="text-foreground">Enge Liegestütze</strong> - mehr Fokus auf Trizeps und innere Brust.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Hände enger als schulterbreit</li>
                          <li>Ellbogen nah am Körper halten</li>
                          <li>Kontrollierte Bewegung wichtig</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Trizeps, innere Brust, vordere Schulter</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="diamond">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Diamond Push-Up</span>
                        <Badge>Fortgeschritten</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="diamond" />
                      </div>
                      <p>
                        <strong className="text-foreground">Diamant-Liegestütze</strong> - maximaler Trizeps-Fokus.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Daumen und Zeigefinger bilden ein Dreieck</li>
                          <li>Hände direkt unter der Brust</li>
                          <li>Ellbogen eng am Körper</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Trizeps (sehr stark), innere Brust</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pike">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Pike Push-Up</span>
                        <Badge>Fortgeschritten</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="pike" />
                      </div>
                      <p>
                        <strong className="text-foreground">Pike-Liegestütze</strong> - gezieltes Schultertraining.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Hüfte nach oben strecken (umgekehrtes V)</li>
                          <li>Kopf Richtung Boden senken</li>
                          <li>Gewicht auf den Schultern</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Schultern (sehr stark), obere Brust, Trizeps</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="decline">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Decline Push-Up</span>
                        <Badge>Fortgeschritten</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="decline" />
                      </div>
                      <p>
                        <strong className="text-foreground">Erhöhte Liegestütze</strong> - mehr Intensität durch erhöhte Füße.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Füße auf erhöhter Fläche (Bank, Stuhl)</li>
                          <li>Mehr Gewicht auf den Armen</li>
                          <li>Verstärkter Fokus auf obere Brust</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Obere Brust, vordere Schulter, Trizeps</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="archer">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">Archer Push-Up</span>
                        <Badge variant="destructive">Experte</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-muted-foreground">
                      <div className="mb-4 bg-muted/30 rounded-lg p-4">
                        <PushUpAnimation variant="archer" />
                      </div>
                      <p>
                        <strong className="text-foreground">Archer-Liegestütze</strong> - Vorbereitung für einarmige Push-Ups.
                      </p>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Ausführung:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Hände sehr breit aufsetzen</li>
                          <li>Gewicht auf eine Seite verlagern</li>
                          <li>Ein Arm fast gestreckt, einer gebeugt</li>
                          <li>Abwechselnd beide Seiten</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Trainiert:</p>
                        <p>Einseitige Kraft, Brust, Stabilisation, Core</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart size={24} weight="bold" className="text-primary" />
                  Gesundheit & Vorteile
                </CardTitle>
                <CardDescription>
                  Warum Liegestütze so effektiv und gesund sind
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Heart size={20} weight="fill" className="text-primary" />
                    Kardiovaskuläre Gesundheit
                  </h3>
                  <p className="text-muted-foreground">
                    Studien zeigen, dass Männer, die 40+ Liegestütze am Stück schaffen, ein <strong className="text-foreground">96% geringeres Risiko</strong> für Herz-Kreislauf-Erkrankungen haben im Vergleich zu denen, die weniger als 10 schaffen.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">💪 Ganzkörpertraining</h3>
                  <p className="text-muted-foreground">
                    Liegestütze trainieren nicht nur Brust und Arme. Sie aktivieren über <strong className="text-foreground">50% deiner Muskeln</strong>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Brust (Pectoralis major & minor)</li>
                    <li>Trizeps & vordere Schulter</li>
                    <li>Core-Muskulatur (Bauch & unterer Rücken)</li>
                    <li>Serratus anterior (wichtig für Schulterstabilität)</li>
                    <li>Beine und Gesäß (isometrische Stabilisation)</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">🦴 Knochengesundheit</h3>
                  <p className="text-muted-foreground">
                    Das Gewichtstraining durch Liegestütze stärkt die Knochendichte und kann <strong className="text-foreground">Osteoporose vorbeugen</strong>. Besonders wichtig im Alter.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">🧠 Mentale Vorteile</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Steigerung des Selbstbewusstseins durch messbare Fortschritte</li>
                    <li>Reduktion von Stress und Angst</li>
                    <li>Verbesserung der Konzentration</li>
                    <li>Release von Endorphinen (Glückshormone)</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">⚡ Stoffwechsel & Fettverbrennung</h3>
                  <p className="text-muted-foreground">
                    Muskelaufbau erhöht den Grundumsatz. Mehr Muskelmasse bedeutet mehr Kalorienverbrennung - <strong className="text-foreground">auch im Ruhezustand</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">🏃 Funktionelle Kraft</h3>
                  <p className="text-muted-foreground">
                    Liegestütze trainieren Bewegungsmuster, die im Alltag relevant sind: Aufstehen vom Boden, Abstützen, Schieben. Diese <strong className="text-foreground">funktionelle Kraft</strong> ist praktisch anwendbar.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <FirstAid size={24} weight="bold" />
                  Wichtige Hinweise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-amber-900/80">
                <div>
                  <p className="font-semibold text-amber-900 mb-1">⚠️ Schulterschmerzen?</p>
                  <p className="text-sm">
                    Bei Schulterproblemen erst medizinisch abklären lassen. Oft helfen engere Varianten oder Pike Push-Ups zur Rehabilitation.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-amber-900 mb-1">⚠️ Handgelenkschmerzen?</p>
                  <p className="text-sm">
                    Versuche Push-Up-Griffe oder mache Liegestütze auf den Fäusten. Handgelenk-Mobilität vor dem Training verbessern.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-amber-900 mb-1">⚠️ Unterer Rücken?</p>
                  <p className="text-sm">
                    Wenn der untere Rücken schmerzt, ist deine Core-Spannung zu schwach. Übe Planks und achte auf eine gerade Körperlinie.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info size={24} weight="bold" className="text-primary" />
                  Trainingstipps & Technik
                </CardTitle>
                <CardDescription>
                  So holst du das Maximum aus deinem Training
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">✅ Perfekte Form</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                    <li>
                      <strong className="text-foreground">Gerade Linie:</strong> Kopf, Rücken, Hüfte und Beine bilden eine Linie - kein durchhängender Bauch!
                    </li>
                    <li>
                      <strong className="text-foreground">Core-Spannung:</strong> Bauch anspannen, als würde jemand zuschlagen wollen
                    </li>
                    <li>
                      <strong className="text-foreground">Voller Bewegungsradius:</strong> Brust sollte fast den Boden berühren
                    </li>
                    <li>
                      <strong className="text-foreground">Kontrolliert:</strong> 2 Sekunden runter, 1 Sekunde hoch - keine ruckartigen Bewegungen
                    </li>
                    <li>
                      <strong className="text-foreground">Atmung:</strong> Beim Runtergang einatmen, beim Hochdrücken ausatmen
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">📈 Progression & Steigerung</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong className="text-foreground">Anfänger (0-10 Push-Ups):</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Starte mit Wand- oder erhöhten Liegestützen</li>
                      <li>3 Sätze à 5-8 Wiederholungen</li>
                      <li>3-4x pro Woche trainieren</li>
                    </ul>

                    <p className="pt-2"><strong className="text-foreground">Fortgeschritten (10-30 Push-Ups):</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>4-5 Sätze à 10-15 Wiederholungen</li>
                      <li>Verschiedene Varianten kombinieren</li>
                      <li>Pausen reduzieren (30-60 Sekunden)</li>
                    </ul>

                    <p className="pt-2"><strong className="text-foreground">Profi (30+ Push-Ups):</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Schwierige Varianten (Archer, Decline, Diamond)</li>
                      <li>Tempo-Variationen (explosive, langsame)</li>
                      <li>Isometrische Holds (Pause in verschiedenen Positionen)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">⏱️ Regeneration</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>
                      <strong className="text-foreground">Ruhetage:</strong> Mindestens 1 Tag Pause zwischen intensiven Sessions
                    </li>
                    <li>
                      <strong className="text-foreground">Schlaf:</strong> 7-9 Stunden für optimale Muskelregeneration
                    </li>
                    <li>
                      <strong className="text-foreground">Ernährung:</strong> Ausreichend Protein (1,6-2,2g pro kg Körpergewicht)
                    </li>
                    <li>
                      <strong className="text-foreground">Stretching:</strong> Nach dem Training Brust und Schultern dehnen
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">🎯 Trainingsziele</h3>
                  <div className="grid gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground">Kraft & Maximalkraft</p>
                      <p className="text-sm text-muted-foreground">3-6 Wiederholungen, schwere Varianten, 3-5 Minuten Pause</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground">Muskelaufbau (Hypertrophie)</p>
                      <p className="text-sm text-muted-foreground">8-12 Wiederholungen, moderate Varianten, 60-90 Sekunden Pause</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground">Kraftausdauer</p>
                      <p className="text-sm text-muted-foreground">15-30+ Wiederholungen, leichte Varianten, 30-45 Sekunden Pause</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">🔥 Häufige Fehler vermeiden</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>❌ Hüfte hängt durch oder Hintern zu weit oben</li>
                    <li>❌ Ellbogen zu weit vom Körper (90° Winkel vermeiden)</li>
                    <li>❌ Kopf nach oben schauen (Nackenbelastung)</li>
                    <li>❌ Nicht tief genug runtergehen</li>
                    <li>❌ Zu schnelle, ruckartige Bewegungen</li>
                    <li>❌ Schultern zu den Ohren ziehen</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">💡 Pro-Tipps</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                    <li>Scapula protraction: Schulterblätter am Ende nach vorne schieben (wichtig für Serratus)</li>
                    <li>Handposition experimentieren: Finde deinen optimalen Winkel</li>
                    <li>Video-Aufnahmen: Filme dich selbst zur Technik-Kontrolle</li>
                    <li>Greasing the Groove: Mehrmals täglich Sub-maximale Sätze für schnellen Fortschritt</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

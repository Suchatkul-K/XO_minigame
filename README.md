This is a personal project by Suchatkul Kempetch, using React-Node to create XO minigame(aka tic-tac-toe)

Featured:
  - Basic game of 3x3 game board
  - Customization of game board(Up to maximum of 15x15)
  - Set winning rules(first to 3 or 4)
  - Review ended game
  - Save and view replays(login required)

Up next:
  - Save deletion
  - Protected save file
  - Better end game UI
  - Play vs Bot feature
  - Server deploy

How to:
1) Clone this repository
2) Set up your own DATABASE_URL in .env file in [backend]
3) install node_module by (npm i) command in both [frontend]  and [backend]
4) (npm run dev) command in both [frontend]  and [backend]
5) see results in your browser at http://localhost:5173/
6) enjoys your games!

What's in here:
1) Front end :TailWind, DaisyUI, Joi validation
   1.1) User & Authentication
     Comprise of login, register, logout, validation and accesstoken verification
   1.2) Game Setting
     Collapsable boardsize setting, game rule & game mode dropdown
   1.3) Main game
     Initialize game board(params), move and win condition logic(for every board setting), waiting message, reset game and post-game replay
   1.4) User replay
     Fetching save game and replay game display
   1.5) Nav bar
     1.5.1) Left side : Quick game, To setup menu
     1.5.2) Left/middle side : Home button
     1.5.3) Right side : User id display, login dropdown(open modal form on click), game history list if any, logout button
2) Back end :Express, Bcrypt.js, jasonwebtoken, Prisma
   2.1) Auth
     Login, Register, getMe(token authenicate)
   2.2) Replay
     Save new replay, get replay-list by userId, get replay by replay id

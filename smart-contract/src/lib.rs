use linera_sdk::base::Owner;
use linera_sdk::contract::{contract, ApplicationCallResult, ContractRuntime};
use linera_sdk::views::{Register, View, ViewStorage};
use serde::{Deserialize, Serialize};

#[derive(Debug, View, Serialize, Deserialize)]
pub struct BounceMania {
    #[view]
    pub state: Register<GameState>,
    #[view]
    pub owner: Register<Owner>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum GameState {
    Waiting,
    InProgress { score: u32 },
    Finished { winner: Owner, score: u32 },
}

#[contract]
impl BounceMania {
    pub fn initialize(&mut self, owner: Owner) {
        self.owner.set(owner);
        self.state.set(GameState::Waiting);
    }

    pub fn start_game(&mut self) -> ApplicationCallResult {
        self.state.set(GameState::InProgress { score: 0 });
        Ok(())
    }

    pub fn submit_score(&mut self, player: Owner, score: u32) -> ApplicationCallResult {
        if let GameState::InProgress { score: _ } = self.state.get() {
            self.state.set(GameState::Finished { winner: player, score });
        }
        Ok(())
    }

    pub fn get_state(&self) -> GameState {
        self.state.get()
    }
}

linera_sdk::contract::main!(BounceMania);
package com.mmorrell.arcana.background;

import lombok.Data;
import org.p2p.solanaj.core.Account;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Component
public class ArcanaAccountManager {

    private List<Account> arcanaAccounts = new ArrayList<>();

}
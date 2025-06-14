#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use JSON;
use Fcntl qw(:flock);

my $q = CGI->new;
print $q->header('application/json');

my $user  = $q->param('user');
my $pass  = $q->param('pass');
my $mobile = $q->param('mobile');

if (!$user || !$pass || !$mobile) {
    print encode_json({ status => 'error', message => 'Missing fields' });
    exit;
}

my $file = 'users.json';
my %users;

if (-e $file) {
    open my $fh, '<', $file;
    flock($fh, LOCK_SH);
    local $/;
    %users = %{ decode_json(<$fh>) };
    close $fh;
}

if ($users{$user}) {
    print encode_json({ status => 'error', message => 'User already exists' });
    exit;
}

$users{$user} = { password => $pass, mobile => $mobile };

open my $fh, '>', $file;
flock($fh, LOCK_EX);
print $fh encode_json(\%users);
close $fh;

print encode_json({ status => 'success', message => 'Registration successful!' });
